<template>
  <edit-dialog
    title="Edit user"
    :visible="visible"
    :operation="operation"
    @close="close"
    @save="save"
  >
    <template v-if="!isNew" #actions>
      <v-btn light flat @click="onChangePasswordClicked">Change Password</v-btn>
    </template>

    <v-flex xs12 sm6>
      <v-text-field v-model="user.full_name" label="Name" required ref="name" />
    </v-flex>
    <v-flex xs12 sm3>
      <v-combobox label="Form of address" :items="formsOfAddress" />
    </v-flex>
    <v-flex xs12 sm3>
      <v-text-field label="Postfix" required ref="postfix" />
    </v-flex>
    <v-flex xs12>
      <v-text-field v-model="user.email" label="Email" ref="email" required />
    </v-flex>
  </edit-dialog>
</template>

<script lang="ts">
import { Operation } from "@/lib/operations";
import { IUser } from "@/modules/types.ts";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";
import { EmptyUser } from "../../types";
import EditDialog from "./EditDialog.vue";

@Component({ components: { EditDialog } })
export default class EditUserDialog extends Vue {
  @Prop({ default: () => EmptyUser }) public readonly user!: IUser;
  @Prop({ default: false }) public visible!: boolean;
  @Prop({}) public readonly operation!: Operation;
  @Prop({ default: () => [] }) public readonly formsOfAddress!: string[];

  @Emit() private close() {
    return;
  }
  @Emit() private save() {
    return this.user;
  }

  @Emit("change-password") private onChangePasswordClicked() {
    return this.user;
  }

  get isNew(): boolean {
    return this.user.oid === 0;
  }
}
</script>
