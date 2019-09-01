<template>
  <v-container fluid>
    <v-layout column>
      <!-- Control panel -->
      <v-btn
        block
        outline
        @click="create"
        data-ref="create-new"
        ref="create-new"
      >
        <v-icon dark>add</v-icon>{{ $t("create") }}
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
        >{{ admin.snackbar.message }}</v-snackbar
      >

      <!-- Content -->
      <slot />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import { AdminStore } from "../store";

@Component
export default class AdminUsersView extends Vue {
  /** On create new entity button clicked. */
  @Emit() private create() {
    return undefined;
  }

  /** Admin store */
  private get admin() {
    return AdminStore;
  }
}
</script>

<i18n>
en:
  create: "Create"
ru:
  create: "Создать"
</i18n>
