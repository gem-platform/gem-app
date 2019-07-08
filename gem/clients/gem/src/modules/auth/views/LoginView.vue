<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <login-form
          @login="login"
          :message="message"
          :errors="errors"
          :busy="isLoginFormBusy"
        />
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
  /** Alert to show on top of a login form. */
  get message() {
    return this.$t(Auth.operations.login.message);
  }

  /**
   * On user clicks Login button.
   * @param credentials Credentials to login with.
   */
  private login(credentials: ICredentials) {
    Auth.login(credentials);
  }

  /** Is login form busy? Show spinner on Login button. */
  public get isLoginFormBusy(): boolean {
    return Auth.operations.login.isInProgress;
  }

  public get errors() {
    if (!Auth.operations.login.isFailed) {
      return [];
    }

    const errors = Auth.operations.login.response;
    return errors.map((x: any) => ({
      location: x.loc.join("."),
      message: this.$i18n.t(x.type)
    }));
  }
}
</script>

<i18n src="@/locales/errors.json"></i18n>
<i18n src="@/locales/validations.json"></i18n>
