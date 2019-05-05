<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12 sm8 md4>
        Admin page
        <router-link to="users" append>Manage users</router-link>
        <router-link to="proposals" append>Manage proposals</router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminIndexView extends Vue {}
</script>
