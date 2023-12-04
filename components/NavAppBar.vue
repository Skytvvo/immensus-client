<script setup lang="ts">

import LogoLink from "~/components/LogoLink.vue";
</script>

<template>
  <div class="app-bar">
    <div class="app-bar__left-side">
      <LogoLink/>
      <Search/>
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
    height: 70px;
  }

  .app-bar__left-side{
    display: flex;
    align-items: center;
    gap: 10px
  }

  .app-bar__right-side{
    display: flex;
  }
</style>