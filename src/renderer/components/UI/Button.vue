<template>
    <button class="button" @click="$emit('click')">
      <slot />
    </button>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .button {
    background-color: #5865f2;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  .button:hover {
    background-color: #4752c4;
  }
  </style>
  