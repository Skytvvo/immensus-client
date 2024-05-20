import {defineStore} from 'pinia'
import {UserProfileType} from "~/types/UserProfile.types";
import {ProductItem} from "~/types/ProductItem.types";

export interface ProductsPanelStore {
    products: PanelProduct[]
}

export interface PanelProduct extends ProductItem{
    creator: {};
    orders: []
}

export const useProductsPanelStore = defineStore('productsPanel', {
    state: (): ProductsPanelStore => ({
        products: []
    }),
    getters: {},
    actions: {
        async loadPanel() {
            const access_token = localStorage.getItem("access_token");

            this.products = await $fetch("/api/item/all", {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
        }
    }
})
