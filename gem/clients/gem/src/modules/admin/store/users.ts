import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { EmptyUser, IChangePassword, IUser, Operation } from "../../types";
import UsersService from "../services/users";

const service = new UsersService();

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "admin-users", store })
export default class UsersStoreModule extends VuexModule {
  public users: IUser[] = [];

  /** List of async operations. */
  public operations = {
    changePassword: new Operation(),
    delete: new Operation(),
    fetch: new Operation(),
    save: new Operation()
  };

  /** UI */

  /**
   * Open edit dialog.
   * @param user User to edit in dialog (default EmptyUser).
   */
  @Mutation public openEditDialog(user: IUser = EmptyUser): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.operations.save.startConfirmation({ ...user });
  }

  /** Close edit dialog. */
  @Mutation public closeEditDialog(): void {
    this.operations.save.clear();
  }

  /**
   * Open user delete confirmation dialog.
   * @param user User to delete.
   */
  @Mutation public openConfirmDeleteDialog(user: IUser): void {
    this.operations.delete.startConfirmation(user);
  }

  /** Close user delete confirmation dialog. */
  @Mutation public closeConfirmDeleteDialog(): void {
    this.operations.delete.cancel();
  }

  /**
   * Open change password dialog.
   * @param user User to change password to.
   */
  @Mutation public openChangePasswordDialog(user: IUser) {
    this.operations.changePassword.startConfirmation(user);
  }

  /** Data */

  /** Fetch */

  /** Fetches list of users from remote server. */
  @Action public async fetch(): Promise<IUser[] | undefined> {
    try {
      this.fetchUsersStarted();
      const users = await service.fetch();
      this.fetchUsersSucceeded(users);
      return users;
    } catch {
      this.fetchUsersFailed("Error: Have no idea why.");
      return undefined;
    }
  }

  /** Users has been fetched successfully. */
  @Mutation private fetchUsersStarted() {
    this.operations.fetch.start();
  }

  /** Users has been fetched successfully. */
  @Mutation private fetchUsersSucceeded(users: IUser[]) {
    this.users = users;
    this.operations.fetch.succeed();
  }

  /** Fetch failed */
  @Mutation private fetchUsersFailed(error: string) {
    this.operations.fetch.fail(error);
  }

  /** Save */

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

  @Mutation private saveUserStarted() {
    this.operations.save.start();
  }

  @Mutation private saveUserFailed(error: string) {
    this.operations.save.fail(error);
  }

  /** User has been successfully created. */
  @Mutation private userCreated(user: IUser) {
    this.users.push(user);
    this.operations.save.succeed("User created");
  }

  /** User has been successfully updated. */
  @Mutation private userUpdated(user: IUser) {
    const original = this.users.find(x => x.oid === user.oid);
    Object.assign(original, user);
    this.operations.save.succeed("User updated");
  }

  /** Delete */

  /**
   * Delete user.
   * @param user User to delete.
   */
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

  @Mutation private deleteUserStarted() {
    this.operations.delete.start();
  }

  /** User has been successfully deleted. */
  @Mutation private userDeleted(user: IUser) {
    this.users = this.users.filter(x => x.oid !== user.oid);
    this.operations.delete.succeed("User deleted");
  }

  /** User has been successfully deleted. */
  @Mutation private deleteUserFailed(message: string = "") {
    this.operations.delete.fail(message);
  }

  /**
   * Change password for specified user.
   * @param changePassword Change password info.
   */
  @Action public changePassword(changePassword: IChangePassword) {
    this.operations.changePassword.start();
    this.operations.changePassword.data = changePassword;
  }

  /** Getters */

  get all(): IUser[] {
    return this.users;
  }
}

export const UsersStore = getModule(UsersStoreModule);
