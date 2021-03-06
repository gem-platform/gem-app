<template>
  <crud @create="onCreateClicked" @delete="onDeleteConfirmed">
    <!-- Edit user dialog -->
    <template v-slot:edit-dialog>
      <edit-user-dialog
        :visible="ops.save.isStartedOrFailed"
        :user="ops.save.data"
        :operation="ops.save"
        :formsOfAddress="formsOfAddress"
        :roles="roles"
        @close="users.closeEditDialog"
        @save="onSaveUserClicked"
        @change-password="onUserChangePassword"
      />
    </template>

    <!-- Table -->
    <template v-slot:table>
      <v-data-table
        :headers="headers"
        :items="users.all"
        :loading="ops.fetch.isInProgress"
        class="elevation-1"
        data-ref="users-table"
      >
        <template v-slot:items="{ item }">
          <td @click="users.openEditDialog(item)">{{ item.fullName }}</td>
          <td class="text-xs-right">
            <v-icon
              small
              class="mr-2"
              @click="users.openEditDialog(item)"
              data-ref="edit-user"
              :data-ref-name="item.name"
              >edit</v-icon
            >
            <v-icon
              small
              @click="onDeleteClicked(item)"
              data-ref="delete-user"
              :data-ref-name="item.name"
              >delete</v-icon
            >
          </td>
        </template>
      </v-data-table>
    </template>

    <!-- Delete entity dialog -->
    <template v-slot:delete-dialog>
      <confirm-dialog
        action="Delete"
        title="Delete user?"
        :data="ops.delete.data"
        :visible="ops.delete.isStarted"
        :busy="ops.delete.isInProgress"
        :canCancel="!ops.delete.isInProgressOrCompleted"
        @cancel="users.closeConfirmDeleteDialog()"
        @confirm="onDeleteConfirmed"
      >
        <template v-slot:default="{ data = { fullName: '' } }">
          <b>{{ data.fullName }}</b> will be deleted. Confirm?
        </template>
      </confirm-dialog>
    </template>

    <!-- Change password dialog -->
    <change-password-dialog
      :visible="ops.changePassword.isStartedOrFailed"
      :busy="ops.changePassword.isInProgress"
      :canCancel="!ops.changePassword.isInProgress"
      :error="ops.changePassword.message"
      @confirm="onPasswordChangeConfirmed"
      @cancel="users.closeChangePasswordDialog()"
    />
  </crud>
</template>

<script lang="ts">
import { formsOfAddress } from "@/modules/consts";

import { Operation } from "@/lib/operations";
import { Component, Vue } from "vue-property-decorator";
import { EmptyUser, IUser } from "../../types";
import { AdminStore, RolesStore, UsersStore } from "../store";

import ChangePasswordDialog from "../components/ChangePasswordDialog.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import Crud from "../components/Crud.vue";
import EditUserDialog from "../components/EditUserDialog.vue";

@Component({
  components: { ConfirmDialog, Crud, EditUserDialog, ChangePasswordDialog }
})
export default class AdminUsersView extends Vue {
  private headers = [
    { text: "Name", value: "fullName" },
    { text: "Actions", align: "right", sortable: false, name: "fullName" }
  ];

  private async mounted() {
    try {
      await RolesStore.fetch();
      await UsersStore.fetch();
    } catch (e) {
      AdminStore.openSnackbar({
        color: "error",
        message: this.ops.fetch.message
      });
    }
  }

  private get ops() {
    return UsersStore.operations;
  }

  private get users() {
    return UsersStore;
  }

  private get roles() {
    return RolesStore.all;
  }

  private async onSaveUserClicked(data: IUser) {
    const res = await UsersStore.save(data);
    if (res) {
      UsersStore.closeEditDialog();
      AdminStore.openSnackbar({
        color: "success",
        message: "User created/updated"
      });
    }
  }

  private onCreateClicked() {
    UsersStore.openEditDialog({ ...EmptyUser });
  }

  private onDeleteClicked(user: IUser) {
    UsersStore.openConfirmDeleteDialog(user);
  }

  private async onDeleteConfirmed(user: IUser) {
    const res = await UsersStore.delete(user);
    AdminStore.openSnackbar({
      color: res ? "success" : "error",
      message: res ? "User deleted" : "Unable to delete user"
    });
  }

  private onUserChangePassword(user: IUser) {
    UsersStore.openChangePasswordDialog(user);
  }

  private async onPasswordChangeConfirmed(chnagePasswordRespone: any) {
    const res = await UsersStore.changePassword({
      password: chnagePasswordRespone.password,
      user: UsersStore.operations.changePassword.data
    });
    if (res) {
      AdminStore.openSnackbar({
        color: "success",
        message: "Password changed"
      });
    }
  }

  private get formsOfAddress() {
    return formsOfAddress;
  }
}
</script>
