import { defineStore } from 'pinia';
import { login } from 'src/services/api/auth';

export const userAuth = defineStore('auth', {
    state: () => ({
        user: {
            id: null,
            name: '',
            roles: [], // ['admin', 'operator', ...]
          },
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
        setUser(userData) {
            this.user = userData;
            this.isAuthenticated = true; 
          },
          logout() {
            this.user = { id: null, name: '', roles: [] };
            this.isAuthenticated = false; 
          },
    },

    getters: {
        hasRole: (state) => (role) => {
          return state.user.roles.includes(role);
        },
      },
})