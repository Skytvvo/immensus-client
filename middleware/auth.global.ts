import {useProfileStore} from "~/store/profile.store";
import {useCartStore} from "~/store/cart.store";
import {useOrderStore} from "~/store/order.store";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        try {
            const profileStore = useProfileStore();
            const cartStore = useCartStore();
            const orderStore = useOrderStore();
            const profile = storeToRefs(profileStore);

            if (profile.user.value || to.path.includes("/auth/")) return;

            await profileStore.loadUserDataByJWTToken();
            if (profile.user.value) {
                await Promise.allSettled([
                    cartStore.loadCart(),
                    orderStore.loadOrders()
                ]);
            }
        } catch (e) {
            console.error(e)
            return navigateTo("/auth/login");
        }
    }
})