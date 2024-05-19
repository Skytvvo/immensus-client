import {defineStore} from 'pinia'
import {useCartStore} from "~/store/cart.store";
import {ProductItem} from "~/types/ProductItem.types";

export interface OrderStore {
    orders: Order[]
}

export interface Order {
    id: string;
    sessionId: string;
    address: string;
    status: string;
    products: ProductItem[];
}

export const useOrderStore = defineStore('order', {
    state: (): OrderStore => ({
        orders: []
    }),
    getters: {
        getTotalActual(state){
            return state.orders.filter((order)=>order.status !== "DELIVERED").length;
        }
    },
    actions: {
        async loadOrders() {
            const access_token = localStorage.getItem("access_token");

            this.orders = await $fetch<Order[]>("/api/order", {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
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
