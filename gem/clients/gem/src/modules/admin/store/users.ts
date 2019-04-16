import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { User, Operation } from "../../types";
import { AnonymousUser } from "@/modules/types";
import UsersService from "../services/users";

const service = new UsersService();

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "admin-users", store })
export default class AdminUsersModule extends VuexModule {
  isBusy: boolean = false;
  isEditDialogVisible: boolean = false;
  editingUser: User = AnonymousUser;
  users: User[] = [];
  fetchOperation: Operation = new Operation();
  saveOperation: Operation = new Operation();

  /**
   * Open edit dialog.
   * @param user User to edit in dialog.
   */
  @Mutation openEditDialog(user: User): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.editingUser = { ...user };
    this.isEditDialogVisible = true;
    this.saveOperation.clear();
  }

  /** Close edit dialog. */
  @Mutation closeEditDialog(): void {
    this.isEditDialogVisible = false;
  }

  @Action async fetch(): Promise<User[] | undefined> {
    try {
      this.usersFetchingStarted();
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

  /** Users has been fetched successfully. */
  @Mutation private usersFetchingStarted() {
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
}

export const AdminUsers = getModule(AdminUsersModule);
