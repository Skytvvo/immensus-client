import {defineStore} from 'pinia'
import {useCartStore} from "~/store/cart.store";
import {ProductItem} from "~/types/ProductItem.types";
import {UserProfileType} from "~/types/UserProfile.types";

export interface OrderStore {
    orders: Order[];
    ordersControl: Order[];
}

export interface Order {
    id: string;
    sessionId: string;
    address: string;
    status: string;
    products: ProductItem[];
    user: UserProfileType;
    cost: number;
}

export const useOrderStore = defineStore('order', {
    state: (): OrderStore => ({
        orders: [],
        ordersControl: []
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
        },
        async loadControlledOrders() {
            try {
                const access_token = localStorage.getItem("access_token");

                this.ordersControl = await $fetch<Order[]>("/api/order/controlled", {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            }
            catch (e){
                alert(e)
            }
        },
        async updateOrder(body: Order){
            try {
                const access_token = localStorage.getItem("access_token");

                await $fetch("/api/order/controlled", {
                    method: "PUT",
                    body,
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                await this.loadControlledOrders();
            }
            catch (e){
                alert(e)
            }
        }
    }
})
