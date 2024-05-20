<script setup lang="ts">


import {ProductItem} from "~/types/ProductItem.types";

const {id} = useRoute().params
const {pending, data} = useLazyFetch<ProductItem>('/api/item', {query: {id}})

const name = ref<string | null>(data.value?.name ?? null)
const description = ref<string | null>(data.value?.description ?? null)
const price = ref<number | null>(data.value?.price ?? null)
const picture = ref<string | null>(data.value?.picture ?? null)

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
    id: data.value?.id,
    name: name.value,
    description: description.value,
    price: price.value,
    picture: picture.value
  }

  try {
    const access_token = localStorage.getItem("access_token");

    const response: { id: string } = await $fetch("/api/item/update", {
      method: "PUT", body: body, headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
    navigateTo(`/item/${response.id}`)
  } catch (e) {
    alert(e)
  }
}

const onDelete = async () => {
  try {
    const access_token = localStorage.getItem("access_token");

    await $fetch("/api/item/delete", {
      method: "DELETE", query: {id}, headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
    navigateTo("/")
  } catch (e) {
    alert(e)
  }
}

</script>

<template>
  <NuxtLayout name="item-editor">
    <span v-if="pending">Loading...</span>
    <form v-else class="flex flex-col items-stretch gap-1 w-80" @submit.prevent="onSubmit">
      <img v-if="picture" :src="picture" alt="preview">
      <input type="file" class="w-full border border-gray-300" name="picture" placeholder="picture"
             accept="image/png, image/jpeg" @change="onFileLoaded">
      <input v-model="name" class="w-full border border-gray-300" type="text" required name="name" placeholder="name">
      <input v-model="price" class="w-full border border-gray-300" type="text" required name="price"
             placeholder="price">
      <input v-model="description" class="w-full border border-gray-300" type="text" required name="description"
             placeholder="description">

      <input type="submit" class="w-full border border-gray-300" value="Update">
    </form>
    <button @click="onDelete">Удалить товар</button>
  </NuxtLayout>
</template>

<style scoped>

</style>