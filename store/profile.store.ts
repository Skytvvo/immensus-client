import {defineStore} from 'pinia'
import {UserProfileType} from "~/types/UserProfile.types";

export interface ProfileStore {
    user: UserProfileType | null
}

export const useProfileStore = defineStore('profile', {
    state: (): ProfileStore => ({
        user: null
    }),
    getters: {},
    actions: {
        async loadUserDataByJWTToken() {
            const access_token = localStorage.getItem("access_token");
            try {
                this.user = await $fetch<UserProfileType>('/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }
})
