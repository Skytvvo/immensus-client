<script setup lang="ts">
  import {useCartStore} from "~/store/cart.store";
  import {useOrderStore} from "~/store/order.store";
  const cartStore = useCartStore();
  const ordersStore = useOrderStore();
</script>

<template>
  <div class="app-bar">
    <div class="app-bar__left-side">
      <DesktopLogoLink/>
      <DesktopSearch/>
    </div>
    <div class="app-bar__right-side">
      <div class="app-bar__right-side__menu">
        <DesktopNavMenuItem to="/item/create">
          Добавить новый товар
        </DesktopNavMenuItem>
        <DesktopNavMenuItem to="/panels/users">
          Пользователи
        </DesktopNavMenuItem>
        <DesktopNavMenuItem to="/panels/orders">
          Заказы
        </DesktopNavMenuItem>
        <DesktopNavMenuItem to="/panels/products">
           Товары
        </DesktopNavMenuItem>
        <DesktopNavMenuItem to="/orders">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="4" width="14" height="17" rx="2" stroke="#222222"/>
            <path d="M9 9H15" stroke="#222222" stroke-linecap="round"/>
            <path d="M9 13H15" stroke="#222222" stroke-linecap="round"/>
            <path d="M9 17H13" stroke="#222222" stroke-linecap="round"/>
          </svg>
          {{ordersStore.getTotalActual}}
        </DesktopNavMenuItem>
        <DesktopNavMenuItem to="/cart">
          <nuxt-icon name="cart" />
          {{cartStore.total}}
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