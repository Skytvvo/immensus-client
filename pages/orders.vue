<script setup lang="ts">
import {useOrderStore} from "~/store/order.store.js";

const ordersStore = useOrderStore();
const {orders} = storeToRefs(ordersStore);

const COLORS_STATUS_MAP = {
  PROCESSING: "yellow",
  DELIVERING: 'orange',
  DELIVERED: 'greenyellow',
  CANCELED: 'red',
}

const STATUS_MAP = {
  PROCESSING: "В обработке",
  DELIVERING: 'В доставке',
  DELIVERED: 'Доставлен',
  CANCELED: 'Отменен',
}
</script>

<template>
  <NuxtLayout name="orders">
    <div class="flex flex-col gap-8 items-center p-20">
      <div class="font-semibold text-2xl mb-4">Мои Заказы</div>
      <div v-for="order in orders" :key="order.id" class="flex flex-col gap-4 px-20 py-10 shadow-xl hover:shadow-2xl rounded-xl	" style="width: 640px">
        <div><span class="font-semibold">Адрес:</span> {{ order.address }}</div>
        <div class="bold text-lg"><span class="font-semibold">Статус:</span> <span class="p-2 rounded-md" :style="`background: ${COLORS_STATUS_MAP[order.status]}`">{{ STATUS_MAP[order.status] }}</span></div>
        <div v-for="product in order.products" class="flex flex-row gap-2">
          <NuxtLink :to="`/item/${product.id}`">
            <img class="w-20 h-20" :src="product.picture" :alt="product.name" >
          </NuxtLink>
          <div class="flex flex-col gap-1">
            <div><span class="font-semibold">Название:</span> {{ product.name }}</div>
            <div><span class="font-semibold">Цена:</span> {{ product.price }}</div>
            <div class="flex"><span class="font-semibold">Описание:</span> {{ product.description }}</div>
          </div>
        </div>
        <div class="mt-4 font-semibold">Всего: {{order.products.reduce((acc, curr) => acc + curr.price, 0)}} Руб</div>
      </div>
    </div>
  </NuxtLayout>
</template>