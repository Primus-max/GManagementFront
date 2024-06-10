import { defineStore } from 'pinia';
import { login } from 'src/services/api/auth';

export const userAuth = defineStore('auth', {
    state: () => ({
        isAuthenticated: false
    }),
    actions: {
        async authenticate(credentials) {
            try {
                await login(credentials);
                const token = localStorage.getItem('token');
                this.isAuthenticated = !!token;
            } catch (error) {
                console.error('Login failed:', error);
                this.isAuthenticated = false;
            }                
        },
        logout() {
            this.isAuthenticated = false
        }
    }
})