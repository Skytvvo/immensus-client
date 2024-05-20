<script setup lang="ts">
import {useCartStore} from "~/store/cart.store";
import {useOrderStore} from "~/store/order.store";

const cartStore = useCartStore();
const orderStore = useOrderStore();
const {cart} = storeToRefs(cartStore);

const address = ref<string | null>(process.client ? localStorage?.getItem("address") : "");

const onOrder = (
    cartItemIds: string[]
) => {
  if(!address.value || address.value?.length < 3)
  {
    alert("Введите корректный адрес!");
    return;
  }

  window?.localStorage.setItem("address", address.value);
  orderStore.makeOrder(cartItemIds, address.value);
}

</script>

<template>
  <NuxtLayout name="cart">
    <div v-if="cartStore.total === 0" class="flex items-center justify-center h-100 w-100">
      Корзина пуста
    </div>
    <div v-else class="flex flex-col gap-5 p-5">
      <div>
        <input v-model="address" type="text" placeholder="Адрес">
        <button @click="() => onOrder(cart.map(({id})=> id))">Заказать все</button>
      </div>
      <div v-for="cartItem in cart" :key="cartItem.id" class="flex gap-5">
        <NuxtLink :to="`/item/${cartItem.product.id}`">
          <img :src="cartItem.product.picture" :alt="cartItem.product.name" class="h-20 w-20">
        </NuxtLink>
        <div class="flex flex-col">
          <span>Название: {{ cartItem.product.name }}</span>
          <span>Цена: {{ cartItem.product.price }}</span>
          <span>Количество: {{ cartItem.quantity }}</span>
        </div>
        <div class="flex-1">{{ cartItem.product.description }}</div>
        <div class="flex flex-col">
          <button
              @click="() => onOrder([cartItem.id])">
            Заказать
          </button>
          <div class="flex gap-5 justify-between">
            <button class="p-2 border border-1 border-gray-500" @click="() => cartStore.addByCartId(cartItem.id)">+
            </button>
            <span class="flex items-center">{{ cartItem.quantity }}</span>
            <button class="p-2 border border-1 border-gray-500" :disabled="!(cartItem.quantity > 1)"
                    @click="() => cartStore.removeByCartId(cartItem.id)">-
            </button>
          </div>
          <button class="p-2 border-2 border-rose-500 hover:bg-red-500 hover:text-white"
                  @click="()=>cartStore.empty(cartItem.id)">Очистить корзину
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>