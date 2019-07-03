<template>
  <crud @create="onCreateClicked" @delete="onDeleteConfirmed">
    <!-- Edit law dialog -->
    <template v-slot:edit-dialog>
      <edit-law-dialog
        :visible="ops.save.isStartedOrFailed"
        :law="ops.save.data"
        :operation="ops.save"
        @close="laws.closeEditDialog"
        @save="onSaveLawClicked"
        @lock="onLockLaw"
      />
    </template>

    <!-- Table -->
    <template v-slot:table>
      <v-data-table
        :headers="headers"
        :items="laws.all"
        :loading="ops.fetch.isInProgress"
        class="elevation-1"
        data-ref="laws-table"
      >
        <template v-slot:items="{ item }">
          <td @click="laws.openEditDialog(item)">
            {{ item.title }}
          </td>
          <td class="text-xs-right">
            <v-icon
              small
              class="mr-2"
              @click="laws.openEditDialog(item)"
              data-ref="edit-law"
              :data-ref-title="item.title">
              edit
            </v-icon>
            <v-icon
              small
              @click="onDeleteClicked(item)"
              data-ref="delete-law"
              :data-ref-title="item.title">
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
        title="Delete law?"
        :data="ops.delete.data"
        :visible="ops.delete.isStarted"
        :busy="ops.delete.isInProgress"
        :canCancel="!ops.delete.isInProgressOrCompleted"
        @cancel="laws.closeConfirmDeleteDialog()"
        @confirm="onDeleteConfirmed"
      >
        <template v-slot:default="{ data = { title: '' } }">
          <b>{{ data.title }}</b> will be deleted. Confirm?
        </template>
      </confirm-dialog>
    </template>
  </crud>
</template>

<script lang="ts">
import { formsOfAddress } from "@/modules/consts";

import { Operation } from "@/lib/operations";
import { Component, Vue } from "vue-property-decorator";
import { ILaw } from "../../types";
import { AdminStore, LawsStore } from "../store";

import ConfirmDialog from "../components/ConfirmDialog.vue";
import Crud from "../components/Crud.vue";
import EditLawDialog from "../components/EditLawDialog.vue";

@Component({
  components: {ConfirmDialog, Crud, EditLawDialog}
})
export default class AdminLawsView extends Vue {
  private headers = [
    {text: "Title", value: "title"},
    {text: "Actions", align: "right", sortable: false, name: "full_name"}
  ];

  private mounted() {
    LawsStore.fetch();
  }

  private get ops() {
    return LawsStore.operations;
  }

  private get laws() {
    return LawsStore;
  }

  private async onSaveLawClicked(data: ILaw) {
    const res = await LawsStore.save(data);
    if (res) {
      LawsStore.closeEditDialog();
      AdminStore.openSnackbar({
        color: "success",
        message: "Law created/updated"
      });
    }
  }

  private onCreateClicked() {
    LawsStore.openEditDialog();
  }

  private onDeleteClicked(law: ILaw) {
    LawsStore.openConfirmDeleteDialog(law);
  }

  private async onDeleteConfirmed(law: ILaw) {
    const res = await LawsStore.delete(law);
    AdminStore.openSnackbar({
      color: res ? "success" : "error",
      message: res ? "Law deleted" : "Unable to delete law"
    });
  }
}
</script>
