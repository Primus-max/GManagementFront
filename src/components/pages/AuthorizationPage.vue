<script setup>
import { ref } from 'vue';

const loginForm = ref({
    username: '',
    password: '',
});

const handleLogin = () => {
    // Здесь можно добавить логику для обработки логина
    console.log('Login form submitted:', loginForm.value);
};

</script>

<template>
    <div class="login-container">
        <el-form :model="loginForm" class="login-form">
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="Логин"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="Пароль"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">Войти</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="css" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #242424;
}

.login-form {
    width: 300px;
    padding: 30px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>