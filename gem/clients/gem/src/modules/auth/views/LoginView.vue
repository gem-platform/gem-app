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
import { Credentials } from "../types";

@Component({
  components: { LoginForm }
})
export default class LoginView extends Vue {
  get message() {
    return Auth.message;
  }

  onLogin(data: Credentials) {
    Auth.login(data);
  }
}
</script>
