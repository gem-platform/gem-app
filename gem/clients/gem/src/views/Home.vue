<template>
  <div class="home">Welcome back, {{ userName }}!</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Auth } from "@/modules/auth/store/auth";

@Component
export default class Home extends Vue {
  get userName() {
    return Auth.user.username;
  }
}
</script>
