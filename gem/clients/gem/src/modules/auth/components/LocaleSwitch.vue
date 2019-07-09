<template>
  <fragment>
    <v-btn icon large @click="changeLocale('en')" ref="en">
      EN
    </v-btn>
    <v-btn icon large @click="changeLocale('ru')" ref="ru">
      RU
    </v-btn>
  </fragment>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { ICredentials } from "../types";

@Component({})
export default class LocaleSwitch extends Vue {
  /** Sets locale of an applications. Emits 'localeChanged' event. */
  @Emit("localeChanged")
  private changeLocale(locale: string) {
    this.$i18n.locale = locale;
    return locale;
  }
}
</script>
