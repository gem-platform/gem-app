<template>
  <v-container fluid fill-height>
    <v-layout column>
      Admin page
      <router-link to="users" append>Manage users</router-link>
      <router-link to="proposals" append>Manage proposals</router-link>
      <router-link to="events" append>Manage events</router-link>
      <router-link to="laws" append>Manage law</router-link>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminIndexView extends Vue {
}
</script>
