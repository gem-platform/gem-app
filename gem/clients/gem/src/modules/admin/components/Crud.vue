<template>
  <v-container fluid>
    <v-layout column>
      <!-- Control panel -->
      <v-btn block outline @click="onCreateClicked" data-ref="create-new-user">
        <v-icon dark>add</v-icon>
        Create
      </v-btn>

      <!-- Table -->
      <slot name="table"></slot>

      <!-- Edit dialog-->
      <slot name="edit-dialog"></slot>

      <!-- Delete entity dialog-->
      <slot name="delete-dialog"></slot>

      <!-- Snackbar for notifications -->
      <v-snackbar
        :value="admin.isSnackbarVisible"
        :top="true"
        :left="true"
        :color="admin.snackbar.color"
        @input="admin.closeSnackbar"
        data-ref="snackbar"
      >
        {{ admin.snackbar.message }}
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import { AdminStore } from "../store";

@Component
export default class AdminUsersView extends Vue {
  /** On create new entity button clicked. */
  @Emit("create") private onCreateClicked() {
    return undefined;
  }

  private get admin() {
    return AdminStore;
  }
}
</script>
