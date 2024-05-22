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
    <div class="flex justify-center p-20">
      <form class="flex flex-col items-center gap-2 shadow-2xl rounded-lg px-20 py-10" @submit.prevent="onSubmit" style="width: 640px">
        <label for="file" style="width: 400px; height: 400px" class="flex items-center justify-center border-gray-500 border-2 cursor-pointer">
          <img v-if="picture" :src="picture" alt="preview" style="width: 400px; height: 400px">
          <div v-else>Добавить изображение</div>
        </label>
        <input type="file" id="file" class="w-full border shadow-md hover:shadow-xl border-gray-300 hidden" required name="picture" placeholder="picture"
               accept="image/png, image/jpeg" @change="onFileLoaded">
        <input v-model="name" class="w-full shadow-md hover:shadow-xl rounded-lg p-4" type="text" required name="name" placeholder="Название">
        <input v-model="price" class="w-full shadow-md hover:shadow-xl rounded-lg	p-4" type="text" required name="price"
               placeholder="Цена">
        <input v-model="description" class="w-full shadow-md hover:shadow-xl rounded-lg	p-4" type="text" required name="description"
               placeholder="Описание">

        <input type="submit" class="shadow-md rounded-lg p-4 hover:shadow-xl bg-gray-200 mt-4	hover:bg-green-500 hover:text-white" value="Create">
      </form>
    </div>
  </NuxtLayout>
</template>

<style scoped>
  .icon-default > svg {
    height: 400px !important;
    width: 400px !important;

  }
</style>