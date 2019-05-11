<template>
  <v-dialog
    v-model="visible"
    max-width="400"
    ref="dialog"
    data-ref="confirm-dialog"
  >
    <v-card ref="card">
      <!-- Header -->
      <v-card-title class="headline">{{ title }}</v-card-title>

      <!-- Content -->
      <v-card-text>
        <slot :data="data">Would you like to do this?</slot>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>

        <!-- Cancel operation button -->
        <v-btn flat v-if="canCancel" @click="cancel" ref="cancel">Cancel</v-btn>

        <!-- Delete operation button -->
        <v-btn
          color="red"
          flat
          ref="confirm"
          :loading="busy"
          :disabled="busy"
          @click="confirm"
          data-ref="confirm"
          >{{ action }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Operation, OperationState } from "@/lib/operations";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";

@Component
export default class ConfirmDialog extends Vue {
  /** Title */
  @Prop({ default: "Perform action?" }) public title!: string;

  /** Action name */
  @Prop({ default: "Confirm" }) public action!: string;

  /** Is dialog visible? */
  @Prop({ default: false }) public visible!: boolean;

  /** Entity data. */
  @Prop({ default: () => {} }) public data!: any;

  /** Is busy? Disable 'delete' and 'cancel' buttons if so. */
  @Prop({ default: false }) public busy!: boolean;

  /** Can cancel operation? Disable 'cancel' button. */
  @Prop({ default: true }) public canCancel!: boolean;

  /** Cancel operation. */
  @Emit() private cancel(): void {
    return;
  }

  /** Confirm operation. */
  @Emit() private confirm(): any {
    return this.data;
  }
}
</script>
