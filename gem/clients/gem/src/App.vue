<template>
  <v-app>
    <v-toolbar v-if="isAuthenticated" color="amber" flat app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="title ml-3 mr-5"
          >GEM&nbsp;<span class="font-weight-light">Online</span></span
        >
      </v-toolbar-title>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Auth } from "@/modules/auth/store/auth";

@Component
export default class Home extends Vue {
  @Watch("isAuthenticated") onAuthenticationChanged(
    isAuthenticated: boolean,
    wasAuthenticated: boolean
  ) {
    // Redirect to /login page if user is not authenticated
    if (!isAuthenticated) this.$router.push("/login");

    // Redirect to / page if authenticated
    if (!wasAuthenticated && isAuthenticated) this.$router.push("/");
  }

  get isAuthenticated() {
    return Auth.isAuthenticated;
  }
}
</script>
