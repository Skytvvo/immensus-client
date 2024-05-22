<script setup lang="ts">


import {ProductItem} from "~/types/ProductItem.types";

const {id} = useRoute().params
const {pending, data} = useLazyFetch<ProductItem>('/api/item', {query: {id}})

const name = ref<string | null>(data.value?.name ?? null)
const description = ref<string | null>(data.value?.description ?? null)
const price = ref<number | null>(data.value?.price ?? null)
const picture = ref<string | null>(data.value?.picture ?? null)
const state = ref<string | null>(data.value?.state ?? null)

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
    picture: picture.value,
    state: state.value
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


const STATUS_MAP = {
  ACTIVE: "В наличии",
  DELETED: 'Недоступен',
}

const COLORS_STATUS_MAP = {
  ACTIVE: "background:greenyellow",
  DELETED: 'background:red; color: white',
}

</script>

<template>
  <NuxtLayout name="item-editor">
    <span v-if="pending">Loading...</span>
    <div v-else class="flex justify-center p-20">

      <form class="flex flex-col items-center gap-2 shadow-2xl rounded-lg px-20 py-10" @submit.prevent="onSubmit">
        <label for="file" style="width: 400px; height: 400px" class="flex items-center justify-center cursor-pointer">
          <img v-if="picture" :src="picture" alt="preview" class="shadow-md hover:shadow-xl rounded-md" style="width: 400px; height: 400px">
          <div v-else class="border-gray-500 border-2 h-100 w-100 flex items-center justify-center ">Добавить изображение</div>
        </label>
        <input type="file" id="file" class="w-full border shadow-md hover:shadow-xl border-gray-300 hidden" required name="picture" placeholder="picture"
               accept="image/png, image/jpeg" @change="onFileLoaded">
        <span class="w-full flex-col flex items-start">
          <span class="font-semibold">Название: </span>
        <input v-model="name" class=" w-full flex-1 shadow-md hover:shadow-xl rounded-lg p-4" type="text" required name="name" placeholder="Название">

        </span>

        <span class="w-full flex-col flex items-start">
          <span class="font-semibold">Цена: </span>
           <input v-model="price" class="w-full shadow-md hover:shadow-xl rounded-lg	p-4" type="text" required name="price"
                  placeholder="Цена">
        </span>

        <span class="w-full flex flex-col items-start">
          <span class="font-semibold">Описание: </span>
          <input v-model="description" class="w-full shadow-md hover:shadow-xl rounded-lg	p-4" type="text" required name="description"
                 placeholder="Описание">
        </span>


        <div class="w-full flex flex-col items-start">
          <label for="select" class="font-semibold">Статус:</label>
          <select v-model="state" id="select" class="w-full shadow-md hover:shadow-xl rounded-lg p-4 flex-1">
            <option value="ACTIVE" class="bg-green-500 text-white">В наличии</option>
            <option value="DELETED" class="bg-red-500 text-white">Недоступен</option>
          </select>
        </div>
        <input type="submit" class="p-2 w-full bg-green-100 hover:bg-green-500 hover:text-white rounded-md mt-8" value="Сохранить">
      </form>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>