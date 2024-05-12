<script setup lang="ts">

import {ProductItem} from "~/types/ProductItem.types";
import {useProfileStore} from "~/store/profile.store";
import {useCartStore} from "~/store/cart.store";

const { id } = useRoute().params
const { pending, data } = useLazyFetch<ProductItem>('/api/item', { query: { id }})

const cartStore = useCartStore();

const onAddToCart = async () => {
  try {
    const access_token = localStorage.getItem("access_token");

    await $fetch("/api/cart/add", {
      method: "POST",
      body: {
        productId: id,
        quantity: 1
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
    await cartStore.loadCart();
  }
  catch (e) {
    console.error(e)
  }
}

</script>

<template>
  <NuxtLayout name="item">
    <span v-if="pending">Loading...</span>
    <div v-else class="flex flex-col">
      <div class="flex">
        <div class="flex w-80 h-80"><img :src="data?.picture" :alt="data?.name"></div>
        <div class="flex flex-col">
          <div class="flex flex-col">
            <span>{{ data?.name }}</span>
            <span>{{ data?.price }}</span>
            <span>{{ data?.description }}</span>
          </div>
          <button class="border-2 border-gray-500 border-solid rounded-md p-2" @click="onAddToCart">Add to the cart</button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
