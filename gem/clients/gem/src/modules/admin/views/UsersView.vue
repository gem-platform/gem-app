<template>
  <v-container fluid>
    <v-layout column>
      <v-btn
        block
        outline
        color="info"
        @click="onCreateClicked"
        data-ref="create-new-user"
      >
        <v-icon dark>add</v-icon>
        Create</v-btn
      >

      <v-data-table
        :headers="headers"
        :items="users"
        :loading="fetchOperation.isInProgress"
        class="elevation-1"
        data-ref="users-table"
      >
        <template v-slot:items="props">
          <td @click="onUserClicked(props.item)">
            {{ props.item.full_name }}
          </td>
          <td>{{ props.item.email }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              @click="onUserDeleteClicked(props.item)"
              data-ref="delete-user"
              >delete</v-icon
            >
          </td>
        </template>
      </v-data-table>

      <edit-user-dialog
        :visible="isEditDialogVisible"
        :user="editingUser"
        :loading="saveOperation.isInProgress"
        :operation="saveOperation"
        @close="onCloseEditDialogClicked"
        @save="onSaveUserClicked"
      />

      <v-snackbar
        :value="isSnackbarVisible"
        :top="true"
        :right="true"
        :color="snackbarColor"
        @input="onCloseSnackbar"
        data-ref="snackbar"
      >
        {{ snackbarMessage }}
        <v-btn dark flat @click="onCloseSnackbar">
          Close
        </v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EditUserDialog from "../components/EditUserDialog.vue";
import { Admin } from "../store/admin";
import { AdminUsers } from "../store/users";
import { User, EmptyUser } from "@/modules/types";
import { Operation } from "../../types";

@Component({
  components: { EditUserDialog }
})
export default class AdminUsersView extends Vue {
  private headers = [
    { text: "Name", value: "full_name" },
    { text: "Email", value: "email" },
    { text: "Actions", align: "right", sortable: false, name: "full_name" }
  ];

  /** On create new user button clicked. */
  private onCreateClicked() {
    AdminUsers.openEditDialog(EmptyUser);
  }

  /** On user selected in a table. */
  private onUserClicked(user: User) {
    AdminUsers.openEditDialog(user);
  }

  /** On dialog closed. */
  private onCloseEditDialogClicked() {
    AdminUsers.closeEditDialog();
  }

  /** On save user clicked */
  private async onSaveUserClicked(data: User) {
    const res = await AdminUsers.save(data);
    AdminUsers.closeEditDialog();
    if (res) {
      Admin.openSnackbar({ message: "User created/updated", color: "success" });
    }
  }

  private onCloseSnackbar() {
    Admin.closeSnackbar();
  }

  private onUserDeleteClicked(user: User) {
    AdminUsers.delete(user);
  }

  /** Show edit dialog or not? */
  private get isEditDialogVisible(): boolean {
    return AdminUsers.isEditDialogVisible;
  }

  /** Editing dialog data. */
  private get editingUser(): User {
    return AdminUsers.editingUser;
  }

  /** List of users. */
  private get users(): User[] {
    return AdminUsers.users;
  }

  private get saveOperation(): Operation {
    return AdminUsers.saveOperation;
  }

  private get fetchOperation(): Operation {
    return AdminUsers.fetchOperation;
  }

  private get snackbarMessage(): string {
    return Admin.snackbarMessage;
  }

  private get isSnackbarVisible(): boolean {
    return Admin.isSnackbarVisible;
  }

  private get snackbarColor(): string {
    return Admin.snackbarColor;
  }

  mounted() {
    AdminUsers.fetch();
  }
}
</script>
