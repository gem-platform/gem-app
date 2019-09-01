<template>
  <v-dialog v-model="visible" max-width="400" ref="dialog" persistent>
    <v-card data-ref="change-password-dialog">
      <!-- Header -->
      <v-toolbar light color="amber" flat>
        <v-btn icon light @click="cancel" data-ref="close">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ $t("password.change") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-alert :value="error !== ''" ref="error">{{ error }}</v-alert>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="password"
              :label="$t('password.new')"
              required
              type="password"
              ref="password"
            />
          </v-flex>
        </v-layout>
      </v-container>

      <!-- Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>

        <!-- Cancel operation button -->
        <v-btn
          flat
          v-if="canCancel"
          @click="cancel"
          ref="cancel"
          data-ref="cancel"
          >{{ $t("cancel") }}</v-btn
        >

        <!-- Change operation button -->
        <v-btn
          color="red"
          flat
          ref="confirm"
          :loading="busy"
          :disabled="busy"
          @click="confirm"
          data-ref="confirm"
          >{{ $t("change") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Operation } from "@/lib/operations";
import {
  Component,
  Emit,
  Model,
  Prop,
  Vue,
  Watch
} from "vue-property-decorator";

@Component
export default class ChangePasswordDialog extends Vue {
  /** Is dialog visible? */
  @Prop({ default: true }) public visible!: boolean;

  /** Is busy? Disable 'delete' and 'cancel' buttons if so. */
  @Prop({ default: false }) public busy!: boolean;

  /** Can cancel operation? Disable 'cancel' button. */
  @Prop({ default: true }) public canCancel!: boolean;

  /** Error message. */
  @Prop({ default: "" }) public error!: string;

  @Watch("visible") private onOpen(newValue: boolean) {
    // cleanup password field before open and close dialog
    this.password = "";
  }

  private password: string = "";

  /** Cancel operation. */
  @Emit() private cancel(): void {
    return;
  }

  /** Confirm operation. */
  @Emit() private confirm(): any {
    return { password: this.password };
  }
}
</script>

<i18n>
en:
  password.new: "New password"
  password.change: "Change password"
  change: "Change"
  cancel: "Cancel"
ru:
  password.new: "Новый пароль"
  password.change: "Сменить пароль"
  change: "Сменить"
  cancel: "Отмена"
</i18n>
