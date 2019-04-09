<template>
  <v-app>
    <v-toolbar v-if="isAuthenticated" app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { Auth } from "@/modules/auth/store/auth";

@Component
export default class Home extends Vue {
  login() {
    Auth.login({ username: "johndoe", password: "secret" });
  }
  get isAuthenticated() {
    return Auth.isAuthenticated;
  }
}
</script>
