<script setup lang="ts">
import {useProfileStore} from "~/store/profile.store";
import {UserProfileType, UserRoles} from "~/types/UserProfile.types";
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref<boolean>(false)

const profileStore = useProfileStore();
const {users, usersLoading} = storeToRefs(profileStore);

onMounted(() => {
  profileStore.loadUsers();
})

onUnmounted(() => {
  profileStore.cleanUsers()
})

const editingUser = ref<UserProfileType & {password: string} | null>(null)

const onEdit = (user: UserProfileType) => {
  editingUser.value = JSON.parse(JSON.stringify(user));
  open.value = true;
}

const onCancel = () => {
  open.value = false;
}

const onSave = () => {
  profileStore.updateProfile(editingUser.value)
  open.value = false;
}

const ROLES_MAP = {
  SELLER: "Продавец",
  ADMIN: "Администратор",
  USER: "Пользователь",
}

</script>

<template>
  <NuxtLayout name="orders">
    <div v-if="usersLoading || users.length === 0" class="flex justify-center items-center h-100 w-100">
      <div>Загрузка</div>
    </div>
    <div v-else class="flex flex-col gap-5 p-20 items-center">
      <div class="font-semibold text-2xl mb-4">Панель пользователей</div>
      <div v-for="user in users" :key="user.id" class="flex gap-2 shadow-xl hover:shadow-2xl p-5 rounded-xl">
        <div class="flex-col w-96">
          <div><span class="font-semibold">Имя пользователя:</span> {{ user.username }}</div>
          <div><span class="font-semibold">Электронная почта:</span> {{ user.email }}</div>
          <div><span class="font-semibold">Роль:</span> {{ ROLES_MAP[user.role] }}</div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button @click="() => onEdit(user)">Редактировать</button>
        </div>
      </div>

      <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="onCancel">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-5">
                  <div class="text-lg font-semibold">
                    Редактирование
                  </div>
                  <div class="flex flex-col w-100 space-y-4 p-4">
                    <!-- Имя пользователя -->
                    <div class="flex items-center">
                      <label for="username" class="w-1/3 font-semibold">Имя:</label>
                      <input
                          id="username"
                          v-model="editingUser.username"
                          type="text"
                          class="w-2/3 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <!-- Электронная почта -->
                    <div class="flex items-center">
                      <label for="email" class="w-1/3 font-semibold">email:</label>
                      <input
                          id="email"
                          v-model="editingUser.email"
                          type="email"
                          class="w-2/3 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <!-- Электронная почта -->
                    <div class="flex items-center">
                      <label for="email" class="w-1/3 font-semibold">Пароль:</label>
                      <input
                          id="password"
                          v-model="editingUser.password"
                          type="password"
                          class="w-2/3 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <!-- Роль -->
                    <div class="flex items-center">
                      <label for="role" class="w-1/3 font-semibold">Роль:</label>
                      <select
                          id="role"
                          v-model="editingUser.role"
                          class="w-2/3 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option :value="UserRoles.ADMIN">Администратор</option>
                        <option :value="UserRoles.SELLER">Продавец</option>
                        <option :value="UserRoles.USER">Пользователь</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex justify-end gap-5">
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
