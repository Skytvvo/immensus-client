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
   <div class="flex flex-col w-64 p-4 gap-2 shadow-md cursor-pointer hover:shadow-2xl items-start rounded-xl">
     <img :src="picture" :alt="name" style="width: 224px; height: 224px" class="w-40 h-40 shadow-md rounded-md">
     <h3 class="font-bold text-2xl">{{name}}</h3>
     <span class="font-bold text-xl">{{price}} Руб</span>
   </div>
 </NuxtLink>
</template>

