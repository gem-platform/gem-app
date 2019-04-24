<template>
  <v-dialog
    v-model="visible"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card data-ref="edit-user-dialog">
      <v-toolbar light color="amber" flat>
        <v-btn icon light @click="close" data-ref="close">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            light
            flat
            @click="save"
            data-ref="save-user"
            :loading="isLoading"
            :disabled="isLoading"
            >Save</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>

      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-alert :value="isAlertVisible" :type="alertType">
              {{ message }}
            </v-alert>
          </v-flex>

          <slot />
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Operation, OperationState } from "@/lib/operations";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";

@Component
export default class EditDialog extends Vue {
  @Prop({ default: false }) public visible!: boolean;
  @Prop({ default: "Edit" }) public title!: string;
  @Prop({ default: false }) public readonly showSuccessAlert!: boolean;
  @Prop() public readonly operation!: Operation;

  @Emit("close") public close() {
    return;
  }
  @Emit("save") public save() {
    return;
  }

  private get isAlertVisible(): boolean {
    if (this.operation === undefined) {
      return false;
    }
    return this.operation.isSucceeded
      ? this.showSuccessAlert && this.operation.message !== ""
      : this.operation.message !== "";
  }

  private get alertType(): string {
    if (this.operation === undefined) {
      return "error";
    }
    return this.operation.isSucceeded ? "success" : "error";
  }

  private get isLoading() {
    return this.operation ? this.operation.isInProgress : false;
  }

  private get message(): string {
    if (this.operation === undefined) {
      return "";
    }
    return this.operation.message;
  }
}
</script>
