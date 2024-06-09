<script setup>
import { RouterView } from "vue-router";
import TheHeaderNavbar from "./components/layout/TheHeaderNavbar.vue";
import TheFooterNavbar from "./components/layout/TheFooterNavbar.vue";
</script>

<template>
  <div>
    <TheHeaderNavbar />
    <router-view></router-view>

    <TheFooterNavbar />
  </div>
</template>

<style scoped>
</style>
