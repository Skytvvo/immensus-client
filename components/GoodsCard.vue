<script setup lang="ts">
import {ProductItem} from "~/types/ProductItem.types";
import {PropType} from "vue";

const props = defineProps({
  productItem: { type: Object as PropType<ProductItem>, required: true },
})

const {productItem: {id, picture, name, price}} = props;

</script>

<template>
 <NuxtLink :to="`/item/${id}`">
   <div class="flex flex-col w-40 p-2 gap-1">
     <img class="w-32 h-32" :src="picture" :alt="name">
     <h3 class="font-bold text-xl">{{name}}</h3>
     <span class="font-bold text-xs">{{price}}</span>
   </div>
 </NuxtLink>
</template>

