<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <nav class="nav">
      <RouterLink class="routs" to="/">        
        <p class="text">Главная</p>
      </RouterLink>

      <RouterLink class="routs" to="/archive">      
        <p class="text">Архив</p>
      </RouterLink>

      <RouterLink class="routs" to="/statisticsOnGirls">      
        <p class="text">Девушки</p>
      </RouterLink>

      <RouterLink class="routs" to="/statisticsOnOperators">      
        <p class="text">Операторы</p>
      </RouterLink>

      <RouterLink class="routs" to="/authorization">      
        <p class="text">Атворизация</p>
      </RouterLink>
    </nav>
  </div>
</template>

<style lang="css" scoped>
.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0;
  position: relative;
}

.routs {
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px;
  transition: background 0.3s, color 0.3s; /* Добавление плавного перехода для фона и цвета текста */
}

.routs:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Легкий полупрозрачный фон при наведении */
  color: #000; /* Изменение цвета текста при наведении */
}

.routs::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: transparent;
  transition: background 0.3s;
}

.routs:hover::after {
  background: #000; /* Цвет закрашиваемой полосы при наведении */
}

.text {
  margin: 0;
  padding-right: 20px; /* Отступ для текста от правого края */
}
</style>
