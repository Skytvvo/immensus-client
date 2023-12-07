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
      <Button class="app-bar__right-side__create-post-button">
        <template #leftIcon>
          <nuxt-icon name="plus_stroke" />
        </template>
        <template #default>
          New Post
        </template>
      </Button>
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

  .app-bar__right-side__create-post-button {
    align-self: center;
  }
</style>