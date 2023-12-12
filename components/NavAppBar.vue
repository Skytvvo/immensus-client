<script setup lang="ts">

</script>

<template>
  <div class="app-bar">
    <div class="app-bar__left-side">
      <LogoLink/>
      <Search/>
    </div>
    <div class="app-bar__right-side">
      <Button class="app-bar__right-side__create-post-button">
        <template #leftIcon>
          <nuxt-icon name="plus_stroke" />
        </template>
        <template #default>
          New Post
        </template>
      </Button>
      <div class="app-bar__right-side__menu">
        <DesktopNavMenuItem to="/">
          <nuxt-icon name="home" />
        </DesktopNavMenuItem>
        <DesktopNavMenuItem to="/explore">
          <nuxt-icon name="compass" />
        </DesktopNavMenuItem>
        <DesktopNavMenuItem to="/direct">
          <nuxt-icon name="arrow" />
        </DesktopNavMenuItem>
        <DesktopNavMenuItem to="/profile">
          <nuxt-icon name="person" />
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