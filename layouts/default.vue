<script lang="ts">

  export default {
    props:{
    },
    data(){
      return {
        mockedAuthor: {
          nickname: "Skytvvo"
        },
        mockedPost: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere velit magna, a molestie sapien scelerisque sed. Mauris sit amet tincidunt nunc, ut iaculis magna. In hac habitasse platea dictumst. Phasellus tristique, magna ac auctor vulputate, dui arcu mollis ligula, nec ullamcorper lorem massa non turpis. Nullam iaculis malesuada orci, cursus volutpat tellus sodales vel. Aliquam sed condimentum sem. Donec accumsan libero sem. Sed vel neque euismod, pellentesque arcu sed, ornare purus. Integer justo lacus, convallis in sapien vehicula, imperdiet suscipit est. Quisque quis pharetra justo, a consequat enim. Donec aliquet tellus id ipsum bibendum efficitur quis eget nisl. Duis lacinia id felis at egestas. Phasellus non orci sed sapien volutpat rhoncus. Donec id accumsan mi. Ut gravida et lectus non euismod. Nam justo ligula, molestie vitae lorem sit amet, dignissim bibendum ligula.",
            likes: 16,
            media: [
              {
                type: "photo",
                src: "https://skytvvo.s3.eu-north-1.amazonaws.com/pngtree-double-row-tree-path-with-yellow-deciduous-autumn-leaves-image_519106.jpg",
                alt: "post-autumn-mock"
              }
            ]
          }

      }
    }
  }
</script>

<template>
  <div class="default--desktop">
    <DesktopNavAppBar/>
    <div class="default-content--desktop">
      <DesktopPost :author="mockedAuthor" :post="mockedPost"/>
    </div>
  </div>
</template>


<style scoped>
  .default--desktop{
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .default-content--desktop{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
