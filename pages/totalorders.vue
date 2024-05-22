<script setup lang="ts">
import {Order, useOrderStore} from "~/store/order.store";
  import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";

  const orderStore = useOrderStore();
  const {ordersControl} = storeToRefs(orderStore);
  const open = ref<boolean>(false)
  const editingOrder = ref<Order | null>(null)

  onMounted(() => {
    orderStore.loadControlledOrders();
  })

  const onCancel = () => {
    open.value = false;
    editingOrder.value = null;
  }

  const onSave = () => {
    orderStore.updateOrder(JSON.parse(JSON.stringify(editingOrder.value)))
    onCancel();
  }

  const onEdit = (order: Order) => {
    open.value = true;
    editingOrder.value = order;
  }

  const STATUS_MAP = {
    PROCESSING: "В обработке",
    DELIVERING: 'В доставке',
    DELIVERED: 'Доставлен',
    CANCELED: 'Отменен',
  }

const COLORS_STATUS_MAP = {
  PROCESSING: "yellow",
  DELIVERING: 'orange',
  DELIVERED: 'greenyellow',
  CANCELED: 'red',
}

</script>

<template>
  <NuxtLayout name="totalorders">
    <div v-if="ordersControl.length === 0" class="flex items-center justify-center w-100 h-100">
      Список пуст
    </div>
    <div v-else class="flex flex-col w-100 p-20 gap-8 items-center">
      <div class="font-semibold text-2xl mb-4">Панель заказов</div>
      <div v-for="order in ordersControl" :key="order.id" class="flex justify-between items-start shadow-xl hover:shadow-2xl p-5 rounded-xl" style="width:600px">
        <div class="flex-col flex">
          <div><span class=" font-semibold">Заказчик:</span> {{order.user.username}}</div>
          <div><span class=" font-semibold">email заказчика:</span> {{order.user.username}}</div>
          <div><span class=" font-semibold">Статус заказа:</span> <span :style="`background: ${COLORS_STATUS_MAP[order.status]}`">{{STATUS_MAP[order.status]}}</span> </div>
          <div><span class=" font-semibold">Адрес заказа:</span> {{order.address}}</div>
          <div v-for="product in order.products" class="flex mt-4 flex-row gap-2">
            <NuxtLink :to="`/item/${product.id}`">
              <img class="w-20 h-20" :src="product.picture" :alt="product.name" >
            </NuxtLink>
            <div class="flex flex-col gap-1 flex-1 justify-start">
              <div><span class=" font-semibold">Название:</span> {{ product.name }}</div>
              <div><span class=" font-semibold">Цена:</span> {{ product.price }}</div>
              <div class="flex"><span class=" font-semibold">Описание:</span> {{ product.description }}</div>
            </div>
          </div>
          <div class="mt-4 font-semibold">Всего: {{order.products.reduce((acc, curr) => acc + curr.price, 0)}} Руб</div>
        </div>
        <button class="font-semibold" @click="() => onEdit(order)">Редактировать</button>
      </div>

      <TransitionRoot as="template" :show="open" v-if="open && !!editingOrder">
        <Dialog class="relative z-10" @close="onCancel">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto" >
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-5">
                  <div class="text-lg font-semibold">
                    Редактирование
                  </div>
                  <div class="flex flex-col w-100 space-y-4">
                    <!-- Статус заказа -->
                    <div class="flex items-center">
                      <label for="status" class="w-1/3 font-semibold">Статус заказа:</label>
                      <select
                          id="status"
                          v-model="editingOrder.status"
                          class="w-2/3 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="PROCESSING">Обработка</option>
                        <option value="DELIVERING">Доставка</option>
                        <option value="DELIVERED">Доставлен</option>
                        <option value="CANCELED">Отменен</option>
                      </select>
                    </div>

                    <!-- Адрес заказа -->
                    <div class="flex items-center">
                      <label for="address" class="w-1/3 font-semibold">Адрес заказа:</label>
                      <input
                          id="address"
                          v-model="editingOrder.address"
                          type="text"
                          class="w-2/3 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div class="w-1/3 font-semibold">Всего: {{editingOrder.products.reduce((acc, curr) => acc + curr.price, 0)}} Руб</div>


                  <div v-for="product in editingOrder.products" class="flex mt-4 flex-row gap-2">
                      <img class="w-20 h-20" :src="product.picture" :alt="product.name" >
                    <div class="flex flex-col gap-1">
                      <div>Название: {{ product.name }}</div>
                      <div>Цена: {{ product.price }}</div>
                      <div class="flex">Описание: {{ product.description }}</div>
                    </div>
                  </div>

                  <div class="flex justify-end gap-5 mt-8">
                    <button @click="onCancel" ref="cancelButtonRef">Отмена</button>
                    <button @click="onSave">Сохранить</button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>