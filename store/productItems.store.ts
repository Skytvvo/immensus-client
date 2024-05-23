import {defineStore} from 'pinia'
import {ProductItem} from "~/types/ProductItem.types";

export interface ProductItemsStore {
    filter: Partial<ProductItemsFilter>,
    paginationOptions: Partial<ProductItemsPaginationOptions>
    products: ProductItem[]
}

const PRODUCT_ITEMS_STORE_DEFAULT: ProductItemsStore = {
    filter: {},
    paginationOptions: {},
    products: [],
}

export const useProductItemsStore = defineStore('productItem', {
    state: (): ProductItemsStore => (PRODUCT_ITEMS_STORE_DEFAULT),
    getters: {},
    actions: {
        async loadProductItems() {
            try {
                const loadedProductItems: ProductItem[] = await $fetch('/api/item/feed', {query: {}});
                this.products = {...this.products, ...loadedProductItems};
            }
            catch (e) {
                console.error(e)
            }
        }
    }
})

export interface ProductItemsFilter {

}

export interface ProductItemsPaginationOptions {

}