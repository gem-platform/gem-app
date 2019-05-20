<template>
  <edit-dialog
    title="Edit user"
    :visible="visible"
    :operation="operation"
    @close="close"
    @save="save"
  >
    <template v-if="!isNew" #actions>
      <v-btn
        light
        flat
        @click="onChangePasswordClicked"
        data-ref="change-password"
        >Change Password</v-btn
      >
    </template>

    <v-flex xs12 sm6>
      <v-text-field
        v-model="user.name"
        label="Name"
        required
        ref="name"
        :error-messages="validationMessage('body.user.name', validationErrors)"
      />
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
    <v-flex xs12>
      <v-select
        v-model="user.role_id"
        :items="roles"
        label="Role"
        item-text="name"
        item-value="oid"
        required
      ></v-select>
    </v-flex>
    <v-flex xs12 v-if="isNew">
      <v-text-field
        v-model="user.password"
        label="Password"
        ref="password"
        required
        :error-messages="
          validationMessage('body.user.password', validationErrors)
        "
      />
    </v-flex>
  </edit-dialog>
</template>

<script lang="ts">
import { Operation } from "@/lib/operations";
import { IUser } from "@/modules/types.ts";
import { mixins } from "vue-class-component";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";
import { EmptyUser } from "../../types";
import ValidationMixin from "../mixins/ValidationMixin";
import EditDialog from "./EditDialog.vue";

@Component({ components: { EditDialog } })
export default class EditUserDialog extends mixins(ValidationMixin) {
  @Prop({ default: () => EmptyUser }) public readonly user!: IUser;
  @Prop({ default: false }) public visible!: boolean;
  @Prop({}) public readonly operation!: Operation;
  @Prop({ default: () => [] }) public readonly formsOfAddress!: string[];
  @Prop({}) public readonly roles!: [];

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
    return this.user.oid === -1;
  }

  public get validationErrors() {
    return this.operation ? this.operation.response : [];
  }
}
</script>
