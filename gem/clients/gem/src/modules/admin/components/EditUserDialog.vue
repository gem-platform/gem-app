<template>
  <v-dialog v-model="visible">
    <v-card data-ref="edit-user-dialog">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="save" data-ref="save-user">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="user.full_name"
              label="Name"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="user.email"
              label="Email"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="user.password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { User } from "@/modules/types.ts";

@Component
export default class EditUserDialog extends Vue {
  @Prop() public readonly user!: User;
  @Prop({ default: false }) visible: boolean = false;

  @Emit("close") close() {
    return;
  }
  @Emit("save") save() {
    return this.user;
  }
}
</script>
