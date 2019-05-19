<template>
  <div class="home">Welcome back, {{ userName }}!</div>
</template>

<script lang="ts">
import { Auth } from "@/modules/auth/store/auth";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  get userName() {
    return Auth.user.name;
  }
}
</script>
