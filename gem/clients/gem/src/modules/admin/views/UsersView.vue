<template>
  <crud @create="onCreateClicked" @delete="onDeleteConfirmed">
    <!-- Edit user dialog -->
    <template v-slot:edit-dialog>
      <edit-user-dialog
        :visible="ops.save.isStartedOrFailed"
        :user="ops.save.data"
        :operation="ops.save"
        :formsOfAddress="formsOfAddress"
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
          <td @click="users.openEditDialog(item)">
            {{ item.full_name }}
          </td>
          <td>{{ item.email }}</td>
          <td class="justify-center layout px-0">
            <v-icon small @click="onDeleteClicked(item)" data-ref="delete-user">
              delete
            </v-icon>
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
        <template v-slot:default="{ data = { full_name: '' } }">
          <b>{{ data.full_name }}</b> will be deleted. Confirm?
        </template>
      </confirm-dialog>
    </template>

    <!-- Change password dialog -->
    <change-password-dialog
      :visible="ops.changePassword.isStarted"
      :busy="ops.changePassword.isInProgress"
      :canCancel="!ops.changePassword.isInProgressOrCompleted"
      @confirm="onPasswordChangeConfirmed"
    />
  </crud>
</template>

<script lang="ts">
import { formsOfAddress } from "@/modules/consts";

import { Operation } from "@/lib/operations";
import { Component, Vue } from "vue-property-decorator";
import { IUser } from "../../types";
import { AdminStore, UsersStore } from "../store";

import ChangePasswordDialog from "../components/ChangePasswordDialog.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import Crud from "../components/Crud.vue";
import EditUserDialog from "../components/EditUserDialog.vue";

@Component({
  components: { ConfirmDialog, Crud, EditUserDialog, ChangePasswordDialog }
})
export default class AdminUsersView extends Vue {
  private headers = [
    { text: "Name", value: "full_name" },
    { text: "Email", value: "email" },
    { text: "Actions", align: "right", sortable: false, name: "full_name" }
  ];

  private mounted() {
    UsersStore.fetch();
  }

  private get ops() {
    return UsersStore.operations;
  }

  private get users() {
    return UsersStore;
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
    UsersStore.openEditDialog();
  }

  private onDeleteClicked(user: IUser) {
    UsersStore.openConfirmDeleteDialog(user);
  }

  private async onDeleteConfirmed(user: IUser) {
    const res = await UsersStore.delete(user);
  }

  private onUserChangePassword(user: IUser) {
    UsersStore.openChangePasswordDialog(user);
  }

  private onPasswordChangeConfirmed(newPassword: string) {
    UsersStore.changePassword({
      password: newPassword,
      user: UsersStore.operations.changePassword.data
    });
  }

  private get formsOfAddress() {
    return formsOfAddress;
  }
}
</script>
