<script setup lang="ts">

</script>

<template>
  <div class="app-bar">
    <div class="app-bar__left-side">
      <DesktopLogoLink/>
      <DesktopSearch/>
    </div>
    <div class="app-bar__right-side">
      <div class="app-bar__right-side__menu">
        <DesktopNavMenuItem to="/cart">
          <nuxt-icon name="cart" />
        </DesktopNavMenuItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-bar{
    display: flex;
    justify-content: space-between;
    height: 70px;
    box-shadow: 0 0 10px 0 var(--border--primary);
  }

  .app-bar__left-side{
    display: flex;
    align-items: center;
    gap: 10px
  }

  .app-bar__right-side{
    display: inline-flex;
    gap: 8px
  }

  .app-bar__right-side__create-post-button {
    align-self: center;
  }

  .app-bar__right-side__menu {
    display: inline-flex;
  }
</style>