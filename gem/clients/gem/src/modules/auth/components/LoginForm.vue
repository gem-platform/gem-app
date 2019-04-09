<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-alert ref="alert" :value="message !== ''">{{ message }}</v-alert>
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="onLoginButtonClicked"
        name="submit"
        ref="submit"
        >Login</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component
export default class LoginForm extends Vue {
  private username: string = "";
  private password: string = "";

  @Prop({ default: "" }) message: string = "";

  @Emit("login") onLoginButtonClicked() {
    return { username: this.username, password: this.password };
  }
}
</script>
