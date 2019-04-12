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
        class="elevation-1"
        data-ref="users-table"
      >
        <template v-slot:items="props">
          <td @click="onUserClicked(props.item)">
            {{ props.item.full_name }}
          </td>
          <td>{{ props.item.email }}</td>
        </template>
      </v-data-table>

      <edit-user-dialog
        :visible="isEditDialogVisible"
        :user="editingUser"
        @close="onCloseEditDialogClicked"
        @save="onSaveUserClicked"
      />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EditUserDialog from "../components/EditUserDialog.vue";
import { AdminUsers } from "../store/index";
import { User, AnonymousUser } from "@/modules/types";

@Component({
  components: { EditUserDialog }
})
export default class AdminUsersView extends Vue {
  private headers = [
    { text: "Name", value: "full_name" },
    { text: "Email", value: "email" }
  ];

  /** On create new user button clicked. */
  private onCreateClicked() {
    AdminUsers.openEditDialog({
      id: 0,
      username: "",
      email: "",
      full_name: "",
      disabled: false
    });
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
    await AdminUsers.save(data);
    AdminUsers.closeEditDialog();
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
}
</script>
