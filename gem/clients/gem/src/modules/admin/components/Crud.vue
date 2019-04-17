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
import { AdminStore } from "../store";

@Component
export default class AdminUsersView extends Vue {
  @Emit("create") private onCreateClicked() {}

  private get admin() {
    return AdminStore;
  }
}
</script>
