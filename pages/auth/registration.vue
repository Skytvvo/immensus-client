<script setup lang="ts">
const username = ref<string | null>(null);
const emailRef = ref<string | null>(null);
const passwordRef = ref<string | null>(null);

const onSignUnRequest = async () => {
  try {
    await $fetch("/api/auth/registration", {
      method: "POST", body: {
        username: username.value,
        email: emailRef.value, password: passwordRef.value
      }
    });
    await navigateTo('login')
  }
  catch (e)
  {
    alert(e);
  }
}
</script>

<template>
  <NuxtLayout name="auth">
    <form class="flex flex-col items-stretch gap-1 w-80" @submit.prevent="onSignUnRequest">
      <input v-model="username" class="w-full border border-gray-300" type="text" placeholder="username" required>
      <input v-model="emailRef" class="w-full border border-gray-300" type="email" placeholder="email" required>
      <input v-model="passwordRef" class=" w-full border border-gray-300" type="password" placeholder="password"
             required>
      <input class="w-full border border-gray-300" type="submit" value="Create Account">
    </form>
    <nuxt-link to="login" class="text-center">Sign In</nuxt-link>
  </NuxtLayout>
</template>

<style scoped>

</style>