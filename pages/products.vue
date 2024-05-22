<script setup lang="ts">

import {useProductsPanelStore} from "~/store/productsPanel.store";

const productsPanelStore = useProductsPanelStore();
const {products} = storeToRefs(productsPanelStore);

onMounted(() => {
  productsPanelStore.loadPanel()
})

onUnmounted(() => {
  productsPanelStore.cleanData()
})

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
  <NuxtLayout name="products">
    <div v-if="products?.length === 0" class="flex items-center justify-center">
      Загрузка
    </div>
    <div v-else class="flex flex-col gap-10 p-20 items-center">
      <div class="font-semibold text-2xl mb-4">Панель товаров</div>
      <div v-for="product in products" :key="product.id" class="flex flex-col gap-5 shadow-xl p-5 rounded-xl" style="width: 600px">
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
            <div><span class="font-semibold">Цена:</span> {{ product.price }} руб</div>
            <div><span class="font-semibold">К-во заказов:</span> {{ product.orders.length }}</div>
            <div><span class="font-semibold">Продавец:</span> {{ product.creator?.username }}</div>
            <div>
              <span class="font-semibold">Статус:</span> <span :style="COLORS_STATUS_MAP[product.state]">{{ STATUS_MAP[product.state] }}</span>
            </div>
            <div class="flex-1"><span class="font-semibold">Описание:</span> {{ product.description }}</div>
          </div>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>