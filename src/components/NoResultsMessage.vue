<script setup>
const props = defineProps({
    message: {
      type: String,
      required: true
    }
  });
</script>

<template>
    <div class="no-results-message">
      {{ message }}
    </div>
  </template>
  

  
  <style lang="css" scoped>
  .no-results-message {
    margin: 40px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;    
    text-align: center;
    color: #555;
    font-weight: bold;
  }
  </style>
  