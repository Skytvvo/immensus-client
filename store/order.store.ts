import {defineStore} from 'pinia'
import {useCartStore} from "~/store/cart.store";

export interface OrderStore {
}

export interface Order {

}

export const useOrderStore = defineStore('order', {
    state: (): OrderStore => ({}),
    getters: {},
    actions: {
        async loadOrders() {

        },
        async makeOrder(
            cartItemIds: string[],
            address: string) {
            const cart = useCartStore();
            const access_token = localStorage.getItem("access_token");

            const res = await $fetch<string>("/api/order/create", {
                method: "POST",
                body: {
                    address,
                    cartItemIds
                },
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            if (window) {
                window.location = res;
            } else {
                throw new Error();
            }

            await Promise.allSettled([
                this.loadOrders(),
                cart.loadCart()
            ])
        }
    }
})
