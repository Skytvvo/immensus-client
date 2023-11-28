<script setup lang="ts">

import LogoLink from "~/components/LogoLink.vue";
</script>

<template>
  <div class="app-bar">
    <div class="app-bar__left-side">
      <LogoLink/>
    </div>
    <div class="app-bar__right-side">
      test
    </div>
  </div>
</template>

<style scoped>
  .app-bar{
    display: flex;
    justify-content: space-between;
  }

  .app-bar__left-side{
    display: flex;
    gap: 10px
  }

  .app-bar__right-side{
    display: flex;
  }
</style>