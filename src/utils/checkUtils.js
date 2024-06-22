export const checkTokenExpiration = (userAuthStore) => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiry = JSON.parse(atob(token.split('.')[1])).exp * 1000; 
      const now = new Date().getTime();
      if (tokenExpiry < now) {        
        userAuthStore.logout();
        return false;
      }
      return true;
    }
    return false;
  };