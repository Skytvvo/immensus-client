import {defineStore} from 'pinia'
import {UserProfileType} from "~/types/UserProfile.types";

export interface ProfileStore {
    user: UserProfileType | null;
    users: UserProfileType[];
    usersLoading: boolean;
}

export const useProfileStore = defineStore('profile', {
    state: (): ProfileStore => ({
        user: null,
        users: [],
        usersLoading: false
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
        },
        async loadUsers(){
            this.usersLoading = true;
            const access_token = localStorage.getItem("access_token");
            try {
                this.users = await $fetch<UserProfileType[]>('/api/users/all', {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });

                this.usersLoading = false;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        cleanUsers(){
            this.users = []
            this.usersLoading = false;
        },
        async updateProfile(body: UserProfileType & {password: string}){
            const access_token = localStorage.getItem("access_token");
            try {
                this.user = await $fetch<UserProfileType>('/api/users/update', {
                    body,
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });

                await this.loadUsers();
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }
})
