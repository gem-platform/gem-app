<template>
  <v-dialog
    v-model="visible"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card data-ref="edit-user-dialog">
      <v-toolbar dark color="primary" flat>
        <v-btn icon dark @click="close" data-ref="close">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit user</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="save" data-ref="save-user">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container grid-list-md>
        <v-layout wrap>
          <slot />
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Model } from "vue-property-decorator";

@Component
export default class EditDialog extends Vue {
  @Prop({ default: false }) visible: boolean;

  @Emit("close") close() {
    return;
  }
  @Emit("save") save() {
    return;
  }
}
</script>
