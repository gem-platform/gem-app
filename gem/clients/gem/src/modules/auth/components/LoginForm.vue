<template>
  <v-card class="elevation-12">
    <!-- Header -->
    <v-toolbar dark color="primary">
      <v-toolbar-title>
        {{ $t("title") }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <locale-switch />
    </v-toolbar>

    <!-- Content -->
    <v-card-text>
      <v-form>
        <!-- Alert message. Doesn't show if no message provided -->
        <v-alert
          ref="alert"
          :value="isAlertVisible"
          type="error"
          transition="fade-transition"
          outline
        >
          {{ message }}
        </v-alert>

        <!-- Name -->
        <v-text-field
          v-model="username"
          prepend-icon="person"
          :label="$t('login')"
          type="text"
          name="username"
          :error-messages="getErrors('body.username')"
        />

        <!-- Password -->
        <v-text-field
          v-model="password"
          prepend-icon="lock"
          :label="$t('password')"
          type="password"
          name="password"
          :error-messages="getErrors('body.password')"
        />
      </v-form>
    </v-card-text>

    <!-- Login button -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="login"
        name="submit"
        ref="submit"
        :loading="busy"
        >{{ $t("enter") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { ICredentials } from "../types";

import LocaleSwitch from "./LocaleSwitch.vue";

@Component({ components: { LocaleSwitch } })
export default class LoginForm extends Vue {
  /** Error message to display on top of form. */
  @Prop({ default: "" }) public message!: string;
  @Prop({ default: () => [] }) public errors!: [];
  @Prop({ default: false }) public busy!: boolean;

  private username: string = "";
  private password: string = "";

  /** On login button clicked. Emit event "login" with credentials. */
  @Emit() private login(): ICredentials {
    return { username: this.username, password: this.password };
  }

  /** Show message on top of a form or not. */
  private get isAlertVisible(): boolean {
    return this.message !== "";
  }

  /** Get validation errors for specified field */
  private getErrors(key: string) {
    return this.errors
      .filter((x: any) => x.location === key)
      .map((x: any) => x.message);
  }
}
</script>

<i18n>
en:
  title: "GEM Online"
  login: "Login"
  password: "Password"
  enter: "Login"
ru:
  title: "GEM Онлайн"
  login: "Логин"
  password: "Пароль"
  enter: "Войти"
</i18n>
