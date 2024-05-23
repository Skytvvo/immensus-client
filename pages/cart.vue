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
  if (!address.value || address.value?.length < 3) {
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
    <div v-else class="flex flex-col gap-8 p-20 items-center">
      <div class="font-semibold text-2xl">Корзина</div>
      <div class="flex justify-between gap-8 mb-4" style="width: 600px">
        <span class="flex-1 flex gap-4 items-center"><span class="font-semibold ">Адрес доставки:</span><input
            class="shadow-md flex-1 hover:shadow-xl p-2 rounded-lg bg-gray-100" v-model="address" type="text"
            placeholder="Адрес"></span>
      </div>
      <div class="flex justify-end gap-8 mb-4 items-center" style="width: 600px">
        <span><span class="font-semibold">Итого: </span>{{cart.reduce((acc, curr)=> acc + curr.quantity * curr.product.price,0)}}</span>
        <button class="shadow-md hover:shadow-xl p-2 rounded-lg hover:bg-green-500 bg-gray-100 hover:text-white"
                @click="() => onOrder(cart.map(({id})=> id))">Заказать все
        </button>
      </div>

      <div v-for="cartItem in cart" :key="cartItem.id" class="flex flex-col gap-8 shadow-xl hover:shadow-2xl rounded-xl p-4"
           style="width: 600px">
        <div flex gap-4>
          <div class="flex gap-4">
            <NuxtLink :to="`/item/${cartItem.product.id}`">
              <img :src="cartItem.product.picture" :alt="cartItem.product.name" class="w-40 h-40 shadow-md hover:shadow-xl rounded-md">
            </NuxtLink>
            <div class="flex flex-col flex-1">
              <span><span class="font-semibold">Название:</span> {{ cartItem.product.name }}</span>
              <span><span class="font-semibold">Цена:</span> {{ cartItem.product.price }} Руб</span>
              <span><span class="font-semibold">Количество:</span> {{ cartItem.quantity }}</span>
              <div><span class="font-semibold">Описание: </span>{{ cartItem.product.description }}</div>
              <span>
                <span class="font-semibold">Количество:</span> <span class="flex gap-4">
               <button class="flex h-8 w-8 items-center justify-center hover:bg-red-500 bg-red-100 hover:text-white shadow-md hover:shadow-xl rounded-md" :disabled="!(cartItem.quantity > 1)"
                       @click="() => cartStore.removeByCartId(cartItem.id)">-
                </button>
                <span class="flex items-center">{{ cartItem.quantity }}</span>

                 <button class="flex h-8 w-8 items-center justify-center bg-green-100 hover:bg-green-500 hover:text-white shadow-md hover:shadow-xl rounded-md " @click="() => cartStore.addByCartId(cartItem.id)">+
                </button>
              </span>
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-1 justify-between items-center">
          <span><span class="font-semibold">Итого:</span> {{cartItem.product.price * cartItem.quantity}}</span>
          <div class="flex gap-4">
            <button class="p-2 bg-red-100 hover:bg-red-500 hover:text-white shadow-md hover:shadow-xl rounded-md"
                    @click="()=>cartStore.empty(cartItem.id)">Удалить из корзины
            </button>
            <button class="p-2 hover:bg-green-500 bg-green-100 hover:text-white shadow-md hover:shadow-xl rounded-md" @click="() => onOrder([cartItem.id])">
              Заказать
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>