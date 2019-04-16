<template>
  <crud-view @create="onCreateClicked">
    <!-- Edit user dialog -->
    <template v-slot:edit-dialog>
      <edit-user-dialog
        ref="editDialog"
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
        <template v-slot:items="props">
          <td @click="users.openEditDialog(props.item)">
            {{ props.item.full_name }}
          </td>
          <td>{{ props.item.email }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              @click="users.delete(props.item)"
              data-ref="delete-user"
              >delete</v-icon
            >
          </td>
        </template>
      </v-data-table>
    </template>
  </crud-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CrudView from "../components/CrudView.vue";
import EditUserDialog from "../components/EditUserDialog.vue";

import { AdminUsers } from "../store/users";
import { Admin } from "../store/admin";
import { Operation, User, EmptyUser } from "../../types";

@Component({
  components: { CrudView, EditUserDialog }
})
export default class AdminUsersView extends Vue {
  private mounted() {
    AdminUsers.fetch();
  }

  private get users() {
    return AdminUsers;
  }

  /** Table */
  private headers = [
    { text: "Name", value: "full_name" },
    { text: "Email", value: "email" },
    { text: "Actions", align: "right", sortable: false, name: "full_name" }
  ];

  /** Edit User dialog */

  private async onSaveUserClicked(data: User) {
    const res = await AdminUsers.save(data);
    AdminUsers.closeEditDialog();
    if (res) {
      Admin.openSnackbar({ message: "User created/updated", color: "success" });
    }
  }

  private onCreateClicked() {
    AdminUsers.openEditDialog(EmptyUser);
  }
}
</script>
