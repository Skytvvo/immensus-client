<script lang="ts">

  import {PropType} from "vue";

  interface GoodsPageImage {
    src?: string;
    alt: string;
  }

  export default defineComponent({
    props: {
      img: {
        type: Object as PropType<GoodsPageImage>,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  })
</script>

<!--
  Usage example

  <GoodsPage
        :img="{
          src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fdded470-0ac5-4bd7-b41b-1bb63e161438/custom-nike-air-force-1-mid-by-you-shoes.png',
          alt: 'nike'
        }"
        :name="'Nike'"
        :price="19.99"
        :description="'This is description of this goods'"
  />

-->

<template>
  <div class="goods_page-container">
    <div class="goods_page-side">
      <img class="goods_page-image" :src="img.src" :alt="img.alt">
    </div>
    <div class="goods_page-side">
      <span class="goods_page-name">{{name}}</span>
      <span class="goods_page-description">{{description}}</span>
      <span class="goods_page-price">{{price}}</span>
      <Button>Add to cart</Button>
    </div>
  </div>
</template>

<style scoped>
  .goods_page-container {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 300px;
    box-shadow: 0 0 10px 0 grey;
    border-radius: 15px;
    gap: 16px;
  }

  .goods_page-side {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .goods_page-image{
    width: 400px;
    height: 400px;
  }

  .goods_page-description {
    font-size: 0.75rem;
  }

  .goods_page-name {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .goods_page-price {
    font-size: 1.25rem;
    color: deeppink;
    font-weight: bold;
  }

</style>