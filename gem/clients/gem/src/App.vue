<template>
  <v-app>
    <v-toolbar v-if="isNavbarVisible" color="amber" flat app>
      <!-- Logo -->
      <v-toolbar-title class="headline text-uppercase">
        <span class="title ml-3 mr-5">
          GEM&nbsp;
          <span class="font-weight-light">Online</span>
        </span>
      </v-toolbar-title>

      <!-- Search -->
      <v-text-field
        solo-inverted
        flat
        hide-details
        :label="$t('search')"
        prepend-inner-icon="search"
      ></v-text-field>

      <!-- Nav buttons -->
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" exact flat>{{ $t("home") }}</v-btn>
        <v-btn to="/admin" flat>{{ $t("admin") }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Content -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Auth } from "./modules/auth/store/auth";

@Component
export default class Home extends Vue {
  @Watch("isAuthenticated")
  private onAuthenticationChanged(
    isAuthenticated: boolean,
    wasAuthenticated: boolean
  ) {
    // Redirect to /login page if user is not authenticated
    if (!isAuthenticated) {
      this.$router.push("/login");
    }

    // Redirect to / page if authenticated
    if (!wasAuthenticated && isAuthenticated) {
      this.$router.push("/");
    }
  }

  get isAuthenticated() {
    return Auth.isAuthenticated;
  }

  get isNavbarVisible(): boolean {
    return Auth.isAuthenticated && Auth.isUserLoaded;
  }
}
</script>

<i18n>
en:
  search: Search
  home: Home
  admin: Admin
ru:
  search: Поиск
  home: Домой
  admin: Админ
</i18n>
