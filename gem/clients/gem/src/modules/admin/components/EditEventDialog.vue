<template>
  <edit-dialog
    title="Edit event"
    :visible="visible"
    :operation="operation"
    @close="close"
    @save="save"
  >
    <v-flex xs12>
      <v-text-field v-model="event.title" label="Title" required ref="title" />
    </v-flex>
    <v-flex xs12>
      <v-textarea v-model="event.agenda" label="Agenda" required ref="agenda" />
    </v-flex>
    <v-flex xs12>
      <v-select
        v-model="event.type"
        :items="types"
        label="Type"
        item-text="type"
        item-value="value"
        required
      >
      </v-select>
    </v-flex>

    <many-days-event-date-picker v-if="isManyDaysEvent" />
    <one-day-event-time-picker
      v-else
      @dates-changed="onDatesChanged"
      :date.sync="date"
    />
  </edit-dialog>
</template>

<script lang="ts">
import { Operation } from "@/lib/operations";
import { EmptyEvent, IEvent } from "@/modules/types.ts";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";
import { EmptyUser } from "../../types";

import EditDialog from "./EditDialog.vue";
import ManyDaysEventDatePicker from "./ManyDaysEventDatePicker.vue";
import OneDayEventTimePicker from "./OneDayEventTimePicker.vue";

@Component({
  components: { EditDialog, OneDayEventTimePicker, ManyDaysEventDatePicker }
})
export default class EditEventDialog extends Vue {
  @Prop({ default: () => EmptyEvent }) public readonly event!: IEvent;
  @Prop({ default: false }) public visible!: boolean;
  @Prop({}) public readonly operation!: Operation;

  private date: string = "2011-11-11";

  private types = [
    { type: "Meeting", value: "meeting" },
    { type: "Review", value: "review" },
    { type: "Event", value: "event" }
  ];

  private get isManyDaysEvent() {
    return this.event.type === "review";
  }

  private onDatesChanged(date) {
    console.log(date);
  }

  @Emit() private close() {
    return;
  }

  @Emit() private save() {
    return this.event;
  }
}
</script>
