<script lang="ts">

import {PropType} from "vue";

interface GoodsCardImage {
  src?: string;
  alt: string;
}

  export default defineComponent({
    props: {
      img: {
        type:Object as PropType<GoodsCardImage>,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
    }
  })
</script>

<!--
  Usage example

      <GoodsCard
        :img="{
          src:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fdded470-0ac5-4bd7-b41b-1bb63e161438/custom-nike-air-force-1-mid-by-you-shoes.png',
          alt: 'nike'
          }"
        :name="'Nike Sneakers'"
        :price="19.99"
      />

-->

<template>
  <div class="goods_card-container">
    <img class="goods_card-image" :src="img.src" :alt="img.alt">
    <h3 class="goods_card-title">{{name}}</h3>
    <span class="goods_card-price">{{price}}</span>
  </div>
</template>

<style scoped>
  .goods_card-container {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 300px;
    box-shadow: 0 0 1px 0 grey;
    overflow: hidden;
  }

  .goods_card-image {
    width: 200px;
    height: 200px;
  }

  .goods_card-title {
    font-size: 1rem;
    font-weight: bold;
    width: 100%;
    text-overflow: ellipsis;
  }

  .goods_card-price {
    font-size: 0.75rem;
    font-weight: bold;
    color: deeppink;
    width: 100%;
  }

</style>