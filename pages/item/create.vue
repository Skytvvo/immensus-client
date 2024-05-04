<script setup lang="ts">

const name = ref<string | null>(null)
const description = ref<string | null>(null)
const price = ref<number | null>(null)
const picture = ref<string | null>(null)

const onFileLoaded = async (e: Event) => {
  const loadedFile: File = (<HTMLInputElement>e.target).files?.[0] as File;

  if (!loadedFile) {
    alert("loading error")
    return;
  }

  try {
    const access_token = localStorage.getItem("access_token");

    const body = new FormData();
    body.append("file", loadedFile);

    const response = await $fetch("/api/item/uploadImage", {
      method: "POST", body: body, headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })

    picture.value = response.Location;
  } catch (e) {
    alert(e)
  }
}

const onSubmit = async () => {
  const body = {
    name: name.value,
    description: description.value,
    price: price.value,
    picture: picture.value
  }

  try {
    const access_token = localStorage.getItem("access_token");

    const {createdProductId}: { createdProductId: string } = await $fetch("/api/item/create", {
      method: "POST", body: body, headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
    navigateTo(createdProductId)
  } catch (e) {
    alert(e)
  }
}

</script>

<template>
  <NuxtLayout name="item-editor">
    <form class="flex flex-col items-stretch gap-1 w-80" @submit.prevent="onSubmit">
      <img v-if="picture" :src="picture" alt="preview">
      <input type="file" class="w-full border border-gray-300" required name="picture" placeholder="picture"
             accept="image/png, image/jpeg" @change="onFileLoaded">
      <input v-model="name" class="w-full border border-gray-300" type="text" required name="name" placeholder="name">
      <input v-model="price" class="w-full border border-gray-300" type="text" required name="price"
             placeholder="price">
      <input v-model="description" class="w-full border border-gray-300" type="text" required name="description"
             placeholder="description">

      <input type="submit" class="w-full border border-gray-300" value="Create">
    </form>
  </NuxtLayout>
</template>

<style scoped>

</style>