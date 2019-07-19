<template>
  <v-container fluid fill-height>
    <v-layout column>
      <h1>{{ $t("page.admin") }}</h1>
      <router-link to="users" append>{{ $t("manage.users") }}</router-link>
      <router-link to="proposals" append>{{
        $t("manage.proposals")
      }}</router-link>
      <router-link to="events" append>{{ $t("manage.events") }}</router-link>
      <router-link to="laws" append>{{ $t("manage.law") }}</router-link>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminIndexView extends Vue {}
</script>

<i18n>
en:
  page.admin: Admin
  manage.users: Manage users
  manage.proposals: Manage proposals
  manage.events: Manage events
  manage.law: Manage events
ru:
  page.admin: Администрирование
  manage.users: Пользователи
  manage.proposals: Законопроекты
  manage.events: События
  manage.law: Законы
</i18n>
