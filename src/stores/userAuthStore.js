import { defineStore } from 'pinia';
import { login } from 'src/services/api/auth';
import { getMe } from 'src/services/api/base/baseRepository';

export const userAuth = defineStore('auth', {
  state: () => ({
    user: {
      id: null,
      name: '',
      role: '',
    },
    isAuthenticated: false,
  }),
  actions: {
    async authenticate(credentials) {
      try {
        await login(credentials);
        const me = await this.getMe();
        if (me) {
          this.setUser(me);
          this.isAuthenticated = true;
        } else {
          console.error('User data not available after authentication');
          this.isAuthenticated = false;
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.isAuthenticated = false;
      }
    },
    setUser(userData) {
      this.user = userData;
    },
    logout() {
      localStorage.removeItem('token');
      this.user = { id: null, name: '', role: '' };
      this.isAuthenticated = false;
    },
    async getMe() {
      const response = await getMe('operators');
      if (response.status !== 200) {
        console.error(response.statusText);
        return null;
      }
      return response.data;
    },
  },
  getters: {
    hasRole: (state) => (role) => {
      return state.user.role === role;
    },
  },
});
