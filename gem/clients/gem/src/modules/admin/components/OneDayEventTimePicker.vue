<template>
  <fragment>
    <!-- Date picker -->
    <v-flex xs12 sm4>
      <v-dialog
        v-model="showDatePicker"
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
          <v-spacer>{{ startDate }}</v-spacer>
          <v-btn flat color="primary" @click="showDatePicker = false">
            Cancel
          </v-btn>
          <v-btn flat color="primary" @click="onDatesChanged">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-flex>

    <!-- Start time picker -->
    <v-flex xs12 sm4>
      <v-dialog
        v-model="showStartTimePicker"
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
          <v-btn flat color="primary" @click="showStartTimePicker = false">
            Cancel
          </v-btn>
          <v-btn flat color="primary" @click="onDatesChanged">
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-flex>

    <!-- End time picker -->
    <v-flex xs12 sm4>
      <v-dialog
        ref="endTimePickerDialog"
        v-model="showEndTimePicker"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endTime"
            label="End time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-model="endTime" full-width>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="showEndTimePicker = false">
            Cancel
          </v-btn>
          <v-btn flat color="primary" @click="onDatesChanged">
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-flex>
  </fragment>
</template>

<script lang="ts">
import { Component, Emit, Model, PropSync, Vue } from "vue-property-decorator";

@Component({})
export default class OneDayEventTimePicker extends Vue {
  @PropSync("date", { type: String }) public startDate!: string;
  @PropSync("timeStart", { type: String }) public startTime!: string;
  @PropSync("timeEnd", { type: String }) public endTime!: string;

  /**
   * Calls when dates are chanaged. Emits "dates-changed" event
   * with following data: { start: Date, end: Date}
   */
  private onDatesChanged() {
    this.hideAllPickers();

    if (this.startDate && this.startTime && this.endTime) {
      this.$emit("dates-changed", {
        end: new Date(this.startDate + " " + this.endTime),
        start: new Date(this.startDate + " " + this.startTime)
      });
    }
  }

  /**
   * Hides all date/time pickers.
   */
  private hideAllPickers() {
    this.showDatePicker = false;
    this.showStartTimePicker = false;
    this.showEndTimePicker = false;
  }

  private showDatePicker: boolean = false;
  private showStartTimePicker: boolean = false;
  private showEndTimePicker: boolean = false;
}
</script>
