<template>
  <crud @create="onCreateClicked" @delete="onDeleteConfirmed">
    <!-- Edit user dialog -->
    <template v-slot:edit-dialog>
      <edit-user-dialog
        :visible="users.isEditDialogVisible"
        :user="users.editingUser"
        :operation="users.saveOperation"
        @close="users.closeEditDialog"
        @save="onSaveUserClicked"
      />
    </template>

    <!-- Table -->
    <template v-slot:table>
      <v-data-table
        :headers="headers"
        :items="users.all"
        :loading="users.fetchOperation.isInProgress"
        class="elevation-1"
        data-ref="users-table"
      >
        <template v-slot:items="{ item }">
          <td @click="users.openEditDialog(item)">
            {{ item.full_name }}
          </td>
          <td>{{ item.email }}</td>
          <td class="justify-center layout px-0">
            <v-icon small @click="onDeleteClicked(item)" data-ref="delete-user"
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
        :visible="users.deleteOperation.isStarted"
        :data="users.deleteOperation.data"
        :busy="users.deleteOperation.isInProgress"
        :canCancel="!users.deleteOperation.isInProgressOrCompleted"
        @cancel="users.deleteOperation.cancel()"
        @confirm="onDeleteConfirmed"
      >
        <template v-slot:default="{ data = { full_name: '' } }">
          <b>{{ data.full_name }}</b> will be deleted. Confirm?
        </template>
      </confirm-dialog>
    </template>
  </crud>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IUser, Operation } from "../../types";
import { AdminStore, UsersStore } from "../store";

import ConfirmDialog from "../components/ConfirmDialog.vue";
import Crud from "../components/Crud.vue";
import EditUserDialog from "../components/EditUserDialog.vue";

@Component({
  components: { ConfirmDialog, Crud, EditUserDialog }
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
    UsersStore.confirmDelete(user);
  }

  private async onDeleteConfirmed(user: IUser) {
    const res = await UsersStore.delete(user);
  }
}
</script>
