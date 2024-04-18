import {UserProfileType} from "~/types/UserProfile.types";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        return await $fetch<UserProfileType>(`${config.servicesDomainUrl}/auth/profile`, {
            headers: {
                Authorization: event.headers.get("Authorization") ?? ""
            }
        });
    } catch (e) {
        console.error(e)
        throw e;
    }
})
