<template>
  <crud @create="onCreateClicked">
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
  </crud>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IUser, Operation } from "../../types";
import { AdminStore, UsersStore } from "../store";

import Crud from "../components/Crud.vue";
import EditUserDialog from "../components/EditUserDialog.vue";

@Component({
  components: { Crud, EditUserDialog }
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
}
</script>
