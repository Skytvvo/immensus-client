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
        total: (state) => state.cart.reduce((total, curr) => total + curr.quantity, 0),
    },
    actions: {
        getCartItemByCartId(id: string): Cart | undefined{
            return  this.cart.find((item) => item.id === id);
        },
        getCartItemByProductId(id: string): Cart | undefined{
            return this.cart.find((item) => item.product.id === id);
        },
        async loadCart() {
            try {
                const access_token = localStorage.getItem("access_token");
                this.cart = await $fetch<Cart[]>('/api/cart/get', {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async addByProductId(productId: string) {
            const cartItemData: Cart | undefined = this.getCartItemByProductId(productId);

            if (cartItemData) {
                await this.updateCart(cartItemData.id, cartItemData.quantity + 1);
            } else {
                await this.createCart(productId, 1);
            }
        },
        async addByCartId(cartId: string) {
            const cartItemData: Cart | undefined = this.getCartItemByCartId(cartId);

            if (!cartItemData) {
                alert("something went wrong...")
                return;
            }

            await this.updateCart(cartItemData.id, cartItemData.quantity + 1);
        },
        async removeByCartId(cartId: string) {
            const cartItemData: Cart | undefined = this.getCartItemByCartId(cartId);

            if (!cartItemData) {
                alert("something went wrong...")
                return;
            }

            await this.updateCart(cartItemData.id, cartItemData.quantity - 1);
        },
        async createCart(productId: string, quantity: number) {
            try {
                const access_token = localStorage.getItem("access_token");

                await $fetch("/api/cart/create", {
                    method: "POST",
                    body: {
                        productId,
                        quantity
                    },
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                })

                await this.loadCart();
            } catch (e) {
                console.error(e)
            }
        },
        async updateCart(cartId: string, quantity: number) {
            try {
                const access_token = localStorage.getItem("access_token");

                await $fetch("/api/cart/update", {
                    method: "POST",
                    body: {
                        id: cartId,
                        quantity
                    },
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                })

                await this.loadCart();
            } catch (e) {
                console.error(e)
            }
        },
        async empty(id: string) {
            try {
                const access_token = localStorage.getItem("access_token");

                await $fetch(`/api/cart/empty`, {
                    query: {
                        id
                    },
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                })

                await this.loadCart();
            } catch (e) {
                alert(e)
            }
        }
    }
})
