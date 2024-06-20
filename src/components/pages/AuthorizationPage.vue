<script setup>
import { ref } from 'vue';

import router from 'src/router/index.js';
import { userAuth } from 'src/stores/userAuthStore';

const authStore = userAuth();
const loginForm = ref({
    login: '',
    password: '',
});

const handleLogin = async () => {
    const LoginModel = {
        Login: loginForm.value.login,
        Password: loginForm.value.password,
    }

    await authStore.authenticate(LoginModel);
    if (authStore.isAuthenticated) {
      router.push({ name: 'main' });
    } else {
      // Handle authentication failure
      console.error('Authentication failed');
    }
};
</script>

<template>
    <div class="login-container">
        <el-form :model="loginForm" class="login-form">
            <el-form-item prop="username">
                <el-input v-model="loginForm.login" placeholder="Логин"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="Пароль"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="enter-btn" @click="handleLogin">Войти</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="css" scoped>
.login-container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-form {
    width: 300px;
    padding: 30px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.enter-btn {
    margin-top: 20px;
    margin-left: 225px;
}
</style>