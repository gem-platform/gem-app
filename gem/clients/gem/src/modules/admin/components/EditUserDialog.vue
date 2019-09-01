<template>
  <edit-dialog
    :title="$t('user.edit')"
    :visible="visible"
    :operation="operation"
    @close="close"
    @save="save"
  >
    <!-- Action buttons -->
    <template v-if="!isNew" #actions>
      <v-btn
        light
        flat
        @click="onChangePasswordClicked"
        data-ref="change-password"
        >{{ $t("password.change") }}</v-btn
      >
    </template>

    <!-- User's name -->
    <v-flex xs12 sm6 data-ref="name-block">
      <v-text-field
        v-model="user.name"
        :label="$t('name')"
        required
        ref="name"
        :error-messages="validationMessage('body.user.name', validationErrors)"
      />
    </v-flex>

    <!-- Form of address -->
    <v-flex xs12 sm3>
      <v-combobox :label="$t('form.of.address')" :items="formsOfAddress" />
    </v-flex>

    <!-- Postfix -->
    <v-flex xs12 sm3>
      <v-text-field :label="$t('postfix')" required ref="postfix" />
    </v-flex>

    <!-- Email -->
    <v-flex xs12>
      <v-text-field
        v-model="user.email"
        :label="$t('email')"
        ref="email"
        required
      />
    </v-flex>

    <!-- Role -->
    <v-flex xs12 data-ref="role-block">
      <v-select
        v-model="user.role.oid"
        :items="roles"
        :label="$t('role')"
        item-text="name"
        item-value="oid"
        required
      ></v-select>
    </v-flex>

    <!-- Password -->
    <v-flex xs12 v-if="isNew" data-ref="password-block">
      <v-text-field
        v-model="user.password"
        :label="$t('password')"
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

<i18n>
en:
  user.edit: "Edit user"
  name: "Name"
  form.of.address: "Form of address"
  postfix: "Postfix"
  email: "EMail"
  role: "Role"
  password: "Password"
  password.change: "Change Password"
ru:
  user.edit: "Редактирование пользователя"
  name: "Имя"
  form.of.address: "Обращение"
  postfix: "Постфикс"
  email: "Эл. Почта"
  role: "Роль"
  password: "Пароль"
  password.change: "Сменить пароль"
</i18n>
