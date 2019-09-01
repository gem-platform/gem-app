<template>
  <fragment>
    <v-btn icon large @click="chnage('en')" ref="en">
      EN
    </v-btn>
    <v-btn icon large @click="chnage('ru')" ref="ru">
      RU
    </v-btn>
  </fragment>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { ICredentials } from "../types";

@Component({})
export default class LocaleSwitch extends Vue {
  /** Sets locale of an applications. Emits 'changed' event. */
  @Emit("changed")
  private chnage(locale: string) {
    this.$i18n.locale = locale;
    return locale;
  }
}
</script>
