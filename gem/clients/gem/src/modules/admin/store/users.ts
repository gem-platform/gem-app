import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { EmptyUser, IUser, Operation, OperationState } from "../../types";
import UsersService from "../services/users";

const service = new UsersService();

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "admin-users", store })
export default class UsersStoreModule extends VuexModule {
  public isEditDialogVisible: boolean = false;
  public editingUser: IUser = { ...EmptyUser };
  public users: IUser[] = [];
  public fetchOperation: Operation = new Operation();
  public saveOperation: Operation = new Operation();
  public deleteOperation: Operation = new Operation();

  /**
   * Open edit dialog.
   * @param user User to edit in dialog (default EmptyUser).
   */
  @Mutation public openEditDialog(user: IUser = EmptyUser): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.editingUser = { ...user };
    this.isEditDialogVisible = true;
  }

  /** Close edit dialog. */
  @Mutation public closeEditDialog(): void {
    this.isEditDialogVisible = false;
    this.saveOperation.clear();
  }

  @Action public async fetch(): Promise<IUser[] | undefined> {
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

  @Mutation public confirmDelete(user: IUser) {
    this.deleteOperation.data = user;
    this.deleteOperation.state = OperationState.Confirmation;
  }

  @Mutation public closeConfirmDelete() {
    this.deleteOperation.cancel();
  }

  /**
   * Save user.
   * @param user User to save.
   * @return User.
   */
  @Action public async save(user: IUser): Promise<IUser | undefined> {
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

  @Action public async delete(user: IUser): Promise<IUser | undefined> {
    try {
      this.deleteUserStarted();
      const result = await service.delete(user);
      this.userDeleted(result);
      return result;
    } catch (ex) {
      this.deleteUserFailed();
    }
  }

  /** Users has been fetched successfully. */
  @Mutation private usersFetchStarted() {
    this.fetchOperation.start();
  }

  /** Users has been fetched successfully. */
  @Mutation private usersFetched(users: IUser[]) {
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
  @Mutation private userCreated(user: IUser) {
    this.users.push(user);
    this.saveOperation.succeed("User created");
  }

  /** User has been successfully updated. */
  @Mutation private userUpdated(user: IUser) {
    const original = this.users.find(x => x.oid === user.oid);
    Object.assign(original, user);
    this.saveOperation.succeed("User updated");
  }

  @Mutation private deleteUserStarted() {
    this.deleteOperation.start();
  }

  /** User has been successfully deleted. */
  @Mutation private userDeleted(user: IUser) {
    this.users = this.users.filter(x => x.oid !== user.oid);
    this.deleteOperation.succeed("User deleted");
  }

  /** User has been successfully deleted. */
  @Mutation private deleteUserFailed(message: string = "") {
    this.deleteOperation.fail(message);
  }

  get all(): IUser[] {
    return this.users;
  }
}

export const UsersStore = getModule(UsersStoreModule);
