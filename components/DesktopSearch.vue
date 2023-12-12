<script setup lang="ts">

</script>

<template>
  <div class="search-container">
    <nuxt-icon name="search" class="search-icon" />
    <input class="search-input" type="text" placeholder="Search" />
  </div>
</template>

<style scoped>

.search-container {
  height: 50px;
  width: 450px;
  position: relative;
  display: flex;
  align-items: center;
  background: var(--background--primary--light);
  border-radius: 10px;
}

.search-icon {
  position: absolute;
  left: 10px;
}

/*todo: fix nuxt overriding*/
.search-icon{
  fill: var(--icon--primary) !important;
}

.search-input {
  padding-left: 30px;
  border-radius: 5px;
  height: 100%;
  flex: 1;
  color: var(--text--primary);
}

.search-input::placeholder{
  color: var(--text--primary--light);
}

</style>