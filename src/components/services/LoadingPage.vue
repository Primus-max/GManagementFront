<script setup>
const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true
    }
})
</script>


<template>
  <transition name="loading" appear>
  <div v-if="isLoading" class="loading-message">
      Загрузка...
    </div>
</transition>
</template>



<style lang="css" scoped>
.loading-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #333;  
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.2s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>