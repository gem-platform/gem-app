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

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "admin/users", store })
export default class AdminUsersModule extends VuexModule {
  isEditDialogVisible: boolean = false;
  editingUser: User = AnonymousUser;
  users: User[] = [
    {
      id: 1,
      username: "user1",
      full_name: "User 123",
      email: "a@b.com",
      disabled: false
    }
  ];

  @Mutation openEditDialog(user: User): void {
    this.editingUser = user;
    this.isEditDialogVisible = true;
  }

  @Mutation closeEditDialog(): void {
    this.isEditDialogVisible = false;
  }

  @Action async save(user: User): Promise<User> {
    if (user.id && user.id > 0) {
      this.userUpdated(user);
    } else {
      this.userCreated(user);
    }
    return user;
  }

  @Mutation private userCreated(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  @Mutation private userUpdated(user: User) {}
}

export const AdminUsers = getModule(AdminUsersModule);
