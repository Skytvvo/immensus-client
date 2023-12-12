<script setup lang="ts">
</script>

<template>
  <NuxtLink class="menu-link--desktop">
    <slot class="test"/>
  </NuxtLink>
</template>

<style scoped>
  .menu-link--desktop {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px;

    position: relative;

    & > * {
      width: 32px;
      height: 32px;
    }
  }

  .router-link-active{
    & svg{
      color: var(--gradient--primary);
    }

    &::after{
      content: "";
      position: absolute;
      bottom: 0;
      height: 3px;
      width: 100%;
      background: var(--gradient--primary);
    }
  }

</style>