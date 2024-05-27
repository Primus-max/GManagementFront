import { defineStore } from 'pinia';

export const userAuth = defineStore('auth', {
    state: () => ({
        isAuthenticated: false
    }),
    actions: {
        authenticate() {
            this.isAuthenticated = true
        },
        logout() {
            this.isAuthenticated = false
        }
    }
})