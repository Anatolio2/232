<template>
    <div class="form-container">
      <h2 class="form-title">{{ title }}</h2>
      <slot />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #2c2f33;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .form-title {
    margin-bottom: 16px;
    color: #fff;
    text-align: center;
    font-size: 24px;
  }
  </style>
  