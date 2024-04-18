<script setup lang="ts">

const emailRef = ref<string | null>(null);
const passwordRef = ref<string | null>(null);

const onSignInRequest = async () => {
  try {
    const {access_token}: { access_token: string } = await $fetch("/api/auth/login", {
      method: "POST", body: {
        email: emailRef.value, password: passwordRef.value
      }
    });
    localStorage.setItem("access_token", access_token)
    navigateTo("/");
  } catch (e) {
    alert(e);
  }
}
</script>

<template>
  <NuxtLayout name="auth">
    <form class="flex flex-col items-stretch gap-1 w-80" @submit.prevent="onSignInRequest">
      <input v-model="emailRef" class="w-full border border-gray-300" type="email" placeholder="email" required>
      <input v-model="passwordRef" class=" w-full border border-gray-300" type="password" placeholder="password"
             required>
      <input class="w-full border border-gray-300" type="submit" value="Login">
    </form>
    <nuxt-link to="registration" class="text-center">Sign Up</nuxt-link>
  </NuxtLayout>
</template>

<style scoped>

</style>