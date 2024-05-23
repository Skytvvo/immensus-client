<script setup lang="ts">

import {ProductItem} from "~/types/ProductItem.types";
import {useCartStore} from "~/store/cart.store";
import {useProfileStore} from "~/store/profile.store";
import {UserRoles} from "~/types/UserProfile.types";

const { id } = useRoute().params
const { pending, data } = useFetch<ProductItem>('/api/item', { query: { id }})

const cartStore = useCartStore();
const profileStore = useProfileStore();
const {user} = storeToRefs(profileStore);
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
  <NuxtLayout name="item">
    <span v-if="pending">Loading...</span>
    <div v-else class="flex flex-col p-20 items-center">
      <div class="flex relative shadow-2xl gap-4 rounded-2xl p-8" style="width: 800px">
        <img :src="data?.picture" :alt="data?.name" style="height: 300px; width: 300px" class="shadow-md rounded-md">
        <div class="flex flex-col justify-between">
          <div class="flex flex-col gap-2">
            <span><span class="font-semibold text-3xl">{{ data?.name }}</span></span>
            <span><span v-if="data" class="p-2 rounded-md" :style="COLORS_STATUS_MAP[data.state]">{{ STATUS_MAP[data.state] }}</span></span>
            <span><span class="font-semibold text-md">Цена: </span>{{ data?.price }} руб</span>
            <span><span class="font-semibold text-md">Описание: </span>{{ data?.description }}</span>
          </div>
          <button class="border-2 border-gray-500 border-solid rounded-md p-2 hover:bg-emerald-600 hover:text-white" @click="() => cartStore.addByProductId(id as string)">Добавить в корзину</button>
        </div>
        <button v-show="user?.role === UserRoles.ADMIN" class="absolute right-2 top-2 shadow-md hover:shadow-lg p-2 rounded-md hover:bg-gray-400 hover:text-white" @click="() => navigateTo(`/item/edit/${id}`)">Редактировать</button>
      </div>
    </div>
  </NuxtLayout>
</template>
