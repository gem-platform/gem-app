<template>
  <crud @create="onCreateClicked" @delete="onDeleteConfirmed">
    <!-- Edit proposal dialog -->
    <template v-slot:edit-dialog>
      <edit-proposal-dialog
        :visible="ops.save.isStartedOrFailed"
        :proposal="ops.save.data"
        :operation="ops.save"
        @close="proposals.closeEditDialog"
        @save="onSaveProposalClicked"
        @lock="onLockProposal"
      />
    </template>

    <!-- Table -->
    <template v-slot:table>
      <v-data-table
        :headers="headers"
        :items="proposals.all"
        :loading="ops.fetch.isInProgress"
        class="elevation-1"
        data-ref="proposals-table"
      >
        <template v-slot:items="{ item }">
          <td @click="proposals.openEditDialog(item)">
            {{ item.title }}
            <v-icon small class="mr-2" v-if="item.locked">lock</v-icon>
          </td>
          <td class="text-xs-right">
            <v-icon
              small
              class="mr-2"
              @click="proposals.openEditDialog(item)"
              data-ref="edit-proposal"
              :data-ref-title="item.title"
              >edit</v-icon
            >
            <v-icon
              small
              @click="onDeleteClicked(item)"
              data-ref="delete-proposal"
              :data-ref-title="item.title"
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
        title="Delete proposal?"
        :data="ops.delete.data"
        :visible="ops.delete.isStarted"
        :busy="ops.delete.isInProgress"
        :canCancel="!ops.delete.isInProgressOrCompleted"
        @cancel="proposals.closeConfirmDeleteDialog()"
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
import { IProposal } from "../../types";
import { AdminStore, ProposalsStore } from "../store";

import ConfirmDialog from "../components/ConfirmDialog.vue";
import Crud from "../components/Crud.vue";
import EditProposalDialog from "../components/EditProposalDialog.vue";

@Component({
  components: { ConfirmDialog, Crud, EditProposalDialog }
})
export default class AdminProposalsView extends Vue {
  private headers = [
    { text: "Title", value: "title" },
    { text: "Actions", align: "right", sortable: false, name: "full_name" }
  ];

  private mounted() {
    ProposalsStore.fetch();
  }

  private get ops() {
    return ProposalsStore.operations;
  }

  private get proposals() {
    return ProposalsStore;
  }

  private async onSaveProposalClicked(data: IProposal) {
    const res = await ProposalsStore.save(data);
    if (res) {
      ProposalsStore.closeEditDialog();
      AdminStore.openSnackbar({
        color: "success",
        message: "Proposal created/updated"
      });
    }
  }

  private onCreateClicked() {
    ProposalsStore.openEditDialog();
  }

  private onDeleteClicked(proposal: IProposal) {
    ProposalsStore.openConfirmDeleteDialog(proposal);
  }

  private async onDeleteConfirmed(proposal: IProposal) {
    const res = await ProposalsStore.delete(proposal);
    AdminStore.openSnackbar({
      color: res ? "success" : "error",
      message: res ? "User deleted" : "Unable to delete user"
    });
  }

  private onLockProposal(proposal: IProposal) {
    ProposalsStore.lock(proposal);
  }
}
</script>
