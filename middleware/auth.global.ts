import {useProfileStore} from "~/store/profile.store";
import {useCartStore} from "~/store/cart.store";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        try {
            const profileStore = useProfileStore();
            const cartStore = useCartStore();
            const profile = storeToRefs(profileStore);

            if (profile.user.value || to.path.includes("/auth/")) return;

            await profileStore.loadUserDataByJWTToken();
            if (profile.user.value) {
                await cartStore.loadCart();
            }
        } catch (e) {
            console.error(e)
            return navigateTo("/auth/login");
        }
    }
})