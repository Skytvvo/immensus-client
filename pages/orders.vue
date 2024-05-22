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
</script>

<template>
  <NuxtLayout name="orders">
    <div class="flex flex-col gap-8">
      <div v-for="order in orders" :key="order.id" class="flex flex-col gap-1">
        <div class="text-lg">Адрес: {{ order.address }}</div>
        <div class="bold text-lg">Статус: <span :style="`background: ${COLORS_STATUS_MAP[order.status]}`">{{ order.status }}</span></div>
        <div v-for="product in order.products" class="flex flex-row gap-2">
          <NuxtLink :to="`/item/${product.id}`">
            <img class="w-20 h-20" :src="product.picture" :alt="product.name" >
          </NuxtLink>
          <div class="flex flex-col gap-1">
            <div>Название: {{ product.name }}</div>
            <div>Цена: {{ product.price }}</div>
          </div>
          <div class="flex">Описание: {{ product.description }}</div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>