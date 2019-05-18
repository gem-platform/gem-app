<template>
  <v-card class="elevation-12">
    <!-- Header -->
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <!-- Content -->
    <v-card-text>
      <v-form>
        <!-- Alert message. Don't show if no message provided -->
        <v-alert ref="alert" :value="showMessage">
          {{ message }}
        </v-alert>

        <!-- Name and password -->
        <v-text-field
          v-model="username"
          prepend-icon="person"
          label="Login"
          type="text"
          name="username"
        />
        <v-text-field
          v-model="password"
          prepend-icon="lock"
          label="Password"
          type="password"
          name="password"
        />
      </v-form>
    </v-card-text>

    <!-- Login button -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="onLoginButtonClicked"
        name="submit"
        ref="submit"
        >Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { ICredentials } from "../types";

@Component
export default class LoginForm extends Vue {
  /** Error message to display. Show nothing if message is not provided. */
  @Prop({ default: "" }) public message!: string;

  private username: string = "";
  private password: string = "";

  /** On login button clicked. Return credentials. */
  @Emit("login") private onLoginButtonClicked(): ICredentials {
    return { username: this.username, password: this.password };
  }

  /** Show error message or not. */
  get showMessage(): boolean {
    return this.message !== "";
  }
}
</script>
