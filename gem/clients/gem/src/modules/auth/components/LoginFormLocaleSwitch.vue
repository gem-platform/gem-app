<template>
  <fragment>
    <v-btn icon large @click="changeLocale('en')">
      EN
    </v-btn>
    <v-btn icon large @click="changeLocale('ru')">
      RU
    </v-btn>
  </fragment>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ICredentials } from "../types";

@Component({})
export default class LoginForm extends Vue {
  private changeLocale(locale: string) {
    this.$i18n.locale = locale;
  }
}
</script>
