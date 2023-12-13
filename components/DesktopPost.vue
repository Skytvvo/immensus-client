<script lang="ts">
  import {PropType} from "vue";
  import MediaCarousel from "~/components/MediaCarousel.vue";

  interface AuthorProps{
    avatar?: {
      src: string;
      alt: string;
    }
    nickname: string;
  }

  interface MediaProps{
    type: "photo" | "video";
    src: string;
    alt: string;
  }

  interface PostProps{
    description: string;
    likes: number;
    media: MediaProps[]
  }

  export  default {
    components: {MediaCarousel},
    props: {
      author: {
        type: Object as PropType<AuthorProps>,
        required: true,
      },
      post: {
        type: Object as PropType<PostProps>,
        required: true
      }
    },
    computed(){

    }
  }
</script>

<template>
  <div class="post--desktop">
    <div class="post--desktop__author">

      <span class="post--desktop__author__avatar">
        <img v-if="author.avatar" :src="author.avatar.src" :alt="author.avatar.alt" >
        <nuxt-icon v-else name="person" />
      </span>

      <span class="post--desktop__author__description">
        <span class="post--desktop__author__description__nickname">
            {{author.nickname}}
        </span>
        <Button>
          <nuxt-icon name="dots-horizontal" />
        </Button>
      </span>

    </div>

    <div class="post--desktop__description">
      {{post.description}}
    </div>

    <div class="post--desktop__media">
      <MediaCarousel/>
    </div>

    <div class="post--desktop__statistic">

      <Button class="post--desktop__statistic__likes">
        <slot name="leftIcon">
          <nuxt-icon name="thumb-up" />
        </slot>
        <slot name="default">
          {{post.likes}}
        </slot>

      </Button>
    </div>
  </div>
</template>

<style scoped>
  .post--desktop{
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 16px;
    box-shadow: 0 0 5px 0 var(--background--primary);
    border-radius: 10px;
  }

  .post--desktop__author{
    display: flex;
  }

  .post--desktop__author__avatar{

  }

  .post--desktop__author__description{
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  .post--desktop__author__description__nickname{
    display: flex;
    align-items: center;
  }

  .post--desktop__description{

  }

</style>