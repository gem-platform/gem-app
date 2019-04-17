import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { User, Operation, EmptyUser } from "../../types";
import UsersService from "../services/users";

const service = new UsersService();

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "admin-users", store })
export default class UsersStoreModule extends VuexModule {
  isEditDialogVisible: boolean = false;
  editingUser: User = { ...EmptyUser };
  users: User[] = [];
  fetchOperation: Operation = new Operation();
  saveOperation: Operation = new Operation();

  /**
   * Open edit dialog.
   * @param user User to edit in dialog (default EmptyUser).
   */
  @Mutation openEditDialog(user: User = EmptyUser): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.editingUser = { ...user };
    this.isEditDialogVisible = true;
  }

  /** Close edit dialog. */
  @Mutation closeEditDialog(): void {
    this.isEditDialogVisible = false;
    this.saveOperation.clear();
  }

  @Action async fetch(): Promise<User[] | undefined> {
    try {
      this.usersFetchStarted();
      const users = await service.fetch();
      this.usersFetched(users);
      return users;
    } catch {
      this.usersFetchFailed("Error: Have no idea why.");
      return undefined;
    }
  }

  /**
   * Save user.
   * @param user User to save.
   * @return User.
   */
  @Action async save(user: User): Promise<User | undefined> {
    try {
      this.saveUserStarted();
      if (user.oid && user.oid > 0) {
        const result = await service.update(user);
        this.userUpdated(result);
      } else {
        const result = await service.create(user);
        this.userCreated(result);
      }
      return user;
    } catch {
      this.saveUserFailed("Error: shit happens");
    }
  }

  @Action async delete(user: User): Promise<User> {
    const result = await service.delete(user);
    this.userDeleted(result);
    return result;
  }

  /** Users has been fetched successfully. */
  @Mutation private usersFetchStarted() {
    this.fetchOperation.start();
  }

  /** Users has been fetched successfully. */
  @Mutation private usersFetched(users: User[]) {
    this.users = users;
    this.fetchOperation.succeed();
  }

  @Mutation private usersFetchFailed(error: string) {
    this.fetchOperation.fail(error);
  }

  @Mutation private saveUserStarted() {
    this.saveOperation.start();
  }

  @Mutation private saveUserFailed(error: string) {
    this.saveOperation.fail(error);
  }

  /** User has been successfully created. */
  @Mutation private userCreated(user: User) {
    this.users.push(user);
    this.saveOperation.succeed("User created");
  }

  /** User has been successfully updated. */
  @Mutation private userUpdated(user: User) {
    const original = this.users.find(x => x.oid === user.oid);
    Object.assign(original, user);
    this.saveOperation.succeed("User updated");
  }

  /** User has been successfully deleted. */
  @Mutation private userDeleted(user: User) {
    this.users = this.users.filter(x => x.oid !== user.oid);
    this.saveOperation.succeed("User deleted");
  }

  get all(): User[] {
    return this.users;
  }
}

export const UsersStore = getModule(UsersStoreModule);
