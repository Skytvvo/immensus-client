<script setup lang="ts">
  import {useCartStore} from "~/store/cart.store";
  import {useOrderStore} from "~/store/order.store";
  import {useProfileStore} from "~/store/profile.store";
  import {UserRoles} from "~/types/UserProfile.types";
  const cartStore = useCartStore();
  const ordersStore = useOrderStore();
  const profileStore = useProfileStore();
  const {user} = storeToRefs(profileStore);

</script>

<template>
  <div class="app-bar">
    <div class="app-bar__left-side">
      <DesktopLogoLink/>
      <DesktopSearch/>
    </div>
    <div class="app-bar__right-side">
      <div class="app-bar__right-side__menu">
        <DesktopNavMenuItem key="new product" v-show="user?.role !== UserRoles.USER" to="/item/create">
          Добавить новый товар
        </DesktopNavMenuItem>
        <DesktopNavMenuItem key="users" v-show="user?.role === UserRoles.ADMIN" to="/users">
          Пользователи
        </DesktopNavMenuItem>
        <DesktopNavMenuItem key="totalorders" v-show="user?.role !== UserRoles.USER" to="/totalorders">
          Заказы
        </DesktopNavMenuItem>
        <DesktopNavMenuItem key="products" v-show="user?.role !== UserRoles.USER" to="/products">
           Товары
        </DesktopNavMenuItem>
        <DesktopNavMenuItem v-show="user?.role !== UserRoles!.SELLER" key="orders" to="/orders">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="4" width="14" height="17" rx="2" stroke="#222222"/>
            <path d="M9 9H15" stroke="#222222" stroke-linecap="round"/>
            <path d="M9 13H15" stroke="#222222" stroke-linecap="round"/>
            <path d="M9 17H13" stroke="#222222" stroke-linecap="round"/>
          </svg>
          {{ordersStore.getTotalActual}}
        </DesktopNavMenuItem>
        <DesktopNavMenuItem v-show="user?.role !== UserRoles.SELLER" key="cart" to="/cart">
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