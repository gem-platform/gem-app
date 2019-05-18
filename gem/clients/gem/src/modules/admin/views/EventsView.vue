<template>
  <crud @create="onCreateClicked" @delete="onDeleteConfirmed">
    <!-- Edit event dialog -->
    <template v-slot:edit-dialog>
      <edit-event-dialog
        :visible="ops.save.isStartedOrFailed"
        :event="ops.save.data"
        :operation="ops.save"
        @close="events.closeEditDialog"
        @save="onSaveEventClicked"
      />
    </template>

    <!-- Table -->
    <template v-slot:table>
      <v-data-table
        :headers="headers"
        :items="events.all"
        :loading="ops.fetch.isInProgress"
        class="elevation-1"
        data-ref="events-table"
      >
        <template v-slot:items="{ item }">
          <td @click="events.openEditDialog(item)">
            {{ item.title }}
            <v-icon small class="mr-2" v-if="item.locked">lock</v-icon>
          </td>
          <td class="text-xs-right">
            <v-icon
              small
              class="mr-2"
              @click="events.openEditDialog(item)"
              data-ref="edit-event"
              :data-ref-title="item.title"
              >edit</v-icon
            >
            <v-icon
              small
              @click="onDeleteClicked(item)"
              data-ref="delete-event"
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
        title="Delete event?"
        :data="ops.delete.data"
        :visible="ops.delete.isStarted"
        :busy="ops.delete.isInProgress"
        :canCancel="!ops.delete.isInProgressOrCompleted"
        @cancel="events.closeConfirmDeleteDialog()"
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
import { Operation } from "@/lib/operations";
import { Component, Vue } from "vue-property-decorator";
import { IEvent } from "../../types";
import { AdminStore, EventsStore } from "../store";

import ConfirmDialog from "../components/ConfirmDialog.vue";
import Crud from "../components/Crud.vue";
import EditEventDialog from "../components/EditEventDialog.vue";

@Component({
  components: { ConfirmDialog, Crud, EditEventDialog }
})
export default class AdmineventsView extends Vue {
  private headers = [
    { text: "Title", value: "title" },
    { text: "Actions", align: "right", sortable: false, name: "full_name" }
  ];

  private mounted() {
    EventsStore.fetch();
  }

  private get ops() {
    return EventsStore.operations;
  }

  private get events() {
    return EventsStore;
  }

  private async onSaveEventClicked(data: IEvent) {
    const res = await EventsStore.save(data);
    if (res) {
      EventsStore.closeEditDialog();
      AdminStore.openSnackbar({
        color: "success",
        message: "Event created/updated"
      });
    }
  }

  private onCreateClicked() {
    EventsStore.openEditDialog();
  }

  private onDeleteClicked(event: IEvent) {
    EventsStore.openConfirmDeleteDialog(event);
  }

  private async onDeleteConfirmed(event: IEvent) {
    const res = await EventsStore.delete(event);
    AdminStore.openSnackbar({
      color: res ? "success" : "error",
      message: res ? "event deleted" : "Unable to delete event"
    });
  }
}
</script>
