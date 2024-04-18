<script setup lang="ts">
const name = ref<string | null>(null)
const description = ref<string | null>(null)
const price = ref<number | null>(null)
const picture = ref<File | null>(null)
const preview = ref<string | null>(null)
const onFileLoaded = (e: Event) => {
  const loadedFile: File =  (<HTMLInputElement>e.target).files?.[0] as File;

  if(!loadedFile)
  {
    alert("loading error")
    return;
  }
  picture.value = loadedFile;

  var fileReader = new FileReader();
  fileReader.onload = function() {
    preview.value = fileReader.result as string;
  }

  fileReader.readAsDataURL(loadedFile);
}

const onSubmit = async () => {
  //todo: add types

  const body = {
    name: name.value,
    description: description.value,
    price: price.value,
    pictures: picture.value
  };

  try {
    const {createdProductId}: {createdProductId: string} = await $fetch("/api/item/create", {method: "POST", body })
    navigateTo(createdProductId)
  }
  catch (e) {
    alert(e)
  }
}

</script>

<template>
  <NuxtLayout name="item-editor">
    <form class="flex flex-col items-stretch gap-1 w-80" @submit.prevent="onSubmit">
      <img v-if="preview" :src="preview" alt="preview">
      <input type="file" class="w-full border border-gray-300" required name="picture" placeholder="picture" accept="image/png, image/jpeg" multiple @change="onFileLoaded">
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