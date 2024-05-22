<script setup lang="ts">

import {useProductItemsStore} from "~/store/productItems.store";

const productItemsStore = useProductItemsStore();
const {products} = storeToRefs(productItemsStore)

onMounted(() => {
  productItemsStore.loadProductItems()
})

</script>

<template>
  <div class="flex flex-col p-20 items-center">
    <div class="font-semibold text-2xl mb-4">Каталог</div>
    <div class="flex flex-wrap gap-4 w-full">
      <GoodsCard v-for="item in products" :key="item.id" :product-item="item"/>
    </div>
  </div>
</template>
