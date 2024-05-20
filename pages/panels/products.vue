<script setup lang="ts">

import {useProductsPanelStore} from "~/store/productsPanel.store";

const productsPanelStore = useProductsPanelStore();
const {products} = storeToRefs(productsPanelStore);

onMounted(() => {
  productsPanelStore.loadPanel()
})

</script>

<template>
  <NuxtLayout name="orders">
    <div v-if="products.length === 0" class="flex items-center justify-center">
      Загрузка
    </div>
    <div v-else class="flex flex-col gap-10 p-20">
      <div v-for="product in products" :key="product.id" class="flex flex-col gap-5 shadow-xl p-5 rounded-xl">
        <div class="font-bold font-600 text-lg">Название:
          <NuxtLink :to="`/item/${product.id}`">{{ product.name }}</NuxtLink>
        </div>
        <div class="font-bold font-600 text-lg">
          <NuxtLink :to="`/item/edit/${product.id}`">Редактировать</NuxtLink>
        </div>
        <div class="flex gap-5">
          <NuxtLink :to="`/item/${product.id}`">
            <img :src="product.picture" :alt="product.name" class="w-40 h-40">
          </NuxtLink>
          <div class="flex flex-col">
            <div>Цена: {{ product.price }} руб</div>
            <div>К-во заказов: {{ product.orders.length }}</div>
            <div>Продавец: {{ product.creator?.username }}</div>
          </div>
          <div>
            Статус: {{ product.state }}
          </div>
          <div class="flex-1">Описание: {{ product.description }}</div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>