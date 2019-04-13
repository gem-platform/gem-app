import Vue from "vue";
import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { User } from "../../types";
import { AnonymousUser } from "@/modules/types";
import AdminUsersService from "../services/users";

const service = new AdminUsersService();

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "admin-users", store })
export default class AdminUsersModule extends VuexModule {
  isBusy: boolean = false;
  isEditDialogVisible: boolean = false;
  editingUser: User = AnonymousUser;
  users: User[] = [];

  /**
   * Open edit dialog.
   * @param user User to edit in dialog.
   */
  @Mutation openEditDialog(user: User): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.editingUser = { ...user };
    this.isEditDialogVisible = true;
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
      this.usersFetchFailed();
      return undefined;
    }
  }

  /**
   * Save user.
   * @param user User to save.
   * @return User.
   */
  @Action async save(user: User): Promise<User> {
    if (user.oid && user.oid > 0) {
      const result = await service.update(user);
      this.userUpdated(result);
    } else {
      const result = await service.create(user);
      this.userCreated(result);
    }
    return user;
  }

  /** Users has been fetched successfully. */
  @Mutation private usersFetchingStarted() {
    this.isBusy = true;
  }

  /** Users has been fetched successfully. */
  @Mutation private usersFetched(users: User[]) {
    this.users = users;
    this.isBusy = false;
  }

  @Mutation private usersFetchFailed() {
    this.isBusy = false;
  }

  /** User has been successfully created. */
  @Mutation private userCreated(user: User) {
    user.oid = this.users.length + 1;
    this.users.push(user);
  }

  /** User has been successfully updated. */
  @Mutation private userUpdated(user: User) {
    const original = this.users.find(x => x.oid === user.oid);
    Object.assign(original, user);
  }
}

export const AdminUsers = getModule(AdminUsersModule);
