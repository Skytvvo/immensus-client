<script setup lang="ts">
</script>

<template>
  <NuxtLayout name="auth">
    <form class="flex flex-col items-stretch gap-1 w-80">
      <input class="w-full border border-gray-300" type="email" placeholder="email">
      <input class=" w-full border border-gray-300" type="password" placeholder="password">
      <input class="w-full border border-gray-300" type="submit" value="Login">
    </form>
    <nuxt-link to="registration" class="text-center">Sign Up</nuxt-link>
  </NuxtLayout>
</template>

<style scoped>

</style>