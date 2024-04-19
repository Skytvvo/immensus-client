<script setup lang="ts">

import {useProductItemsStore} from "~/store/productItems.store";

const productItemsStore = useProductItemsStore();
const {products} = storeToRefs(productItemsStore)

onMounted(() => {
  productItemsStore.loadProductItems()
})

</script>

<template>
  <div class="flex flex-wrap w-full">
    <GoodsCard v-for="item in products" :key="item.id" :product-item="item"/>
  </div>
</template>
