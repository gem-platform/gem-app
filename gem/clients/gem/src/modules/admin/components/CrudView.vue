<template>
  <v-container fluid>
    <v-layout column>
      <!-- Control panel -->
      <v-btn
        block
        outline
        color="info"
        @click="onCreateClicked"
        data-ref="create-new-user"
      >
        <v-icon dark>add</v-icon>
        Create</v-btn
      >

      <!-- Table -->
      <slot name="table"></slot>

      <!-- Edit dialog-->
      <slot name="edit-dialog"></slot>

      <!-- Snackbar for notifications -->
      <v-snackbar
        :value="isSnackbarVisible"
        :top="true"
        :left="true"
        :color="snackbarColor"
        @input="onCloseSnackbar"
        data-ref="snackbar"
      >
        {{ snackbarMessage }}
        <!--
        <v-btn dark flat icon @click="onCloseSnackbar">
          <v-icon>close</v-icon>
        </v-btn>
        -->
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { Admin } from "../store/admin";

@Component
export default class AdminUsersView extends Vue {
  @Emit("create") private onCreateClicked() {}

  private onCloseSnackbar() {
    Admin.closeSnackbar();
  }

  private get snackbarMessage(): string {
    return Admin.snackbarMessage;
  }

  private get isSnackbarVisible(): boolean {
    return Admin.isSnackbarVisible;
  }

  private get snackbarColor(): string {
    return Admin.snackbarColor;
  }
}
</script>
