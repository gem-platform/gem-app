<template>
  <fragment>
    <!-- Start date picker -->
    <v-flex xs12 sm6>
      <v-dialog
        ref="startDatePickerDialog"
        v-model="showStartDatePickerDialog"
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
          <v-btn
            flat
            color="primary"
            @click="showStartDatePickerDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            color="primary"
            @click="$refs.startDatePickerDialog.save(startDate)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </v-flex>

    <v-flex xs12 sm6>
      <v-dialog
        ref="endDatePickerDialog"
        v-model="showEndDatePickerDialog"
        :return-value.sync="endDate"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endDate"
            label="End date"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="showEndDatePickerDialog = false">
            Cancel
          </v-btn>
          <v-btn
            flat
            color="primary"
            @click="$refs.endDatePickerDialog.save(startDate)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </v-flex>
  </fragment>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ManyDaysEventTimePicker extends Vue {
  private startDate = "";
  private endDate = "";
  private showStartDatePickerDialog: boolean = false;
  private showEndDatePickerDialog: boolean = false;
}
</script>
