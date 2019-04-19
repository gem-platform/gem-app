<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <login-form @login="onLogin" :message="message" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "../components/LoginForm.vue";

import { Auth } from "../store/auth";
import { ICredentials } from "../types";

@Component({
  components: { LoginForm }
})
export default class LoginView extends Vue {
  get message() {
    return Auth.message;
  }

  /**
   * On user clicks Login button.
   * @param credentials Credentials to login with.
   */
  private onLogin(credentials: ICredentials) {
    Auth.login(credentials);
  }
}
</script>
