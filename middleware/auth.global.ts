import {useProfileStore} from "~/store/profile.store";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        try {
            const profileStore = useProfileStore();
            const profile = storeToRefs(profileStore);

            if (profile.user.value || to.path.includes("/auth/")) return;

            await profileStore.loadUserDataByJWTToken();
        } catch (e) {
            console.error(e)
            return navigateTo("/auth/login");
        }
    }
})