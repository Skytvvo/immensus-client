import {defineStore} from 'pinia'
import {ProductItem} from "~/types/ProductItem.types";

export interface CartStore {
    cart: Cart[];
}

export interface Cart {
    id: string;
    quantity: number;
    product: ProductItem;
}

export const useCartStore = defineStore('cart', {
    state: (): CartStore => ({
        cart: []
    }),
    getters: {
        total: (state) => state.cart.reduce((total, curr) => total + curr.quantity, 0)
    },
    actions: {
        async loadCart() {
            try {
                const access_token = localStorage.getItem("access_token");
                this.cart = await $fetch<Cart[]>('/api/cart/get', {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                console.log(this.cart)
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        }
    }
})
