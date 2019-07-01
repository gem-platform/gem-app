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
    <v-flex xs12 sm6>
      <v-dialog
        ref="datePickerDialog"
        v-model="showDatePickerDialog"
        :return-value.sync="startDate"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startDate"
            label="Start date"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="startDate" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="showDatePickerDialog = false">
            Cancel
          </v-btn>
          <v-btn
            flat
            color="primary"
            @click="$refs.datePickerDialog.save(startDate)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs12 sm6>
      <v-dialog
        ref="timePickerDialog"
        v-model="showTimePickerDialog"
        :return-value.sync="startTime"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startTime"
            label="Start time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-model="startTime" full-width>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="showTimePickerDialog = false">
            Cancel
          </v-btn>
          <v-btn
            flat
            color="primary"
            @click="$refs.timePickerDialog.save(startTime)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-flex>
  </edit-dialog>
</template>

<script lang="ts">
import { Operation } from "@/lib/operations";
import { EmptyEvent, IEvent } from "@/modules/types.ts";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";
import { EmptyUser } from "../../types";
import EditDialog from "./EditDialog.vue";

@Component({ components: { EditDialog } })
export default class EditUserDialog extends Vue {
  @Prop({ default: () => EmptyEvent }) public readonly event!: IEvent;
  @Prop({ default: false }) public visible!: boolean;
  @Prop({}) public readonly operation!: Operation;

  private range = {};
  private startTime = "";
  private startDate = "";
  private showDatePickerDialog: boolean = false;
  private showTimePickerDialog: boolean = false;
  private types = [
    { type: "Meeting", value: "meeting" },
    { type: "Review", value: "review" },
    { type: "Event", value: "event" }
  ];

  @Emit() private close() {
    return;
  }

  @Emit() private save() {
    return this.event;
  }
}
</script>
