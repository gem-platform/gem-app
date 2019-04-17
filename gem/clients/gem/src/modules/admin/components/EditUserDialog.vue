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
import { IUser } from "@/modules/types.ts";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";
import { EmptyUser, Operation } from "../../types";
import EditDialog from "./EditDialog.vue";

@Component({ components: { EditDialog } })
export default class EditUserDialog extends Vue {
  @Prop({ default: () => EmptyUser }) public readonly user!: IUser;
  @Prop({ default: false }) public visible!: boolean;
  @Prop({}) public readonly operation!: Operation;

  @Emit("close") private close() {
    return;
  }
  @Emit("save") private save() {
    return this.user;
  }
}
</script>
