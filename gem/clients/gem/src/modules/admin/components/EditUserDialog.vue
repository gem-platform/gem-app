<template>
  <edit-dialog
    title="Edit user"
    :visible="visible"
    :operation="operation"
    @close="close"
    @save="save"
  >
    <v-flex xs12>
      <v-text-field
        v-model="user.full_name"
        label="Name"
        required
        ref="name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        v-model="user.email"
        label="Email"
        ref="email"
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
  </edit-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Model } from "vue-property-decorator";
import { User } from "@/modules/types.ts";
import { AnonymousUser, Operation } from "../../types";
import EditDialog from "./EditDialog.vue";

@Component({ components: { EditDialog } })
export default class EditUserDialog extends Vue {
  @Prop({ default: AnonymousUser }) public readonly user!: User;
  @Prop({ default: false }) visible!: boolean;
  @Prop({}) readonly operation!: Operation;

  @Emit("close") close() {
    return;
  }
  @Emit("save") save() {
    return this.user;
  }
}
</script>
