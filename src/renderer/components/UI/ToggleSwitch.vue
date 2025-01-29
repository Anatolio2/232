<template>
    <div
      class="toggle-switch"
      :class="{ active: modelValue }"
      @click="toggle"
      :style="switchStyles"
    >
      <div class="toggle-thumb" :style="thumbStyles">
        <span :style="iconStyles">{{ modelValue ? '✔' : '✖' }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: Boolean, // Для работы с v-model
      width: {
        type: Number,
        default: 60, // Ширина переключателя
      },
      height: {
        type: Number,
        default: 30, // Высота переключателя
      },
      thumbSize: {
        type: Number,
        default: 26, // Размер круглого ползунка
      },
      iconSize: {
        type: Number,
        default: 16, // Размер иконки внутри
      }
    },
    computed: {
      switchStyles() {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`,
          borderRadius: `${this.height / 2}px`,
        };
      },
      thumbStyles() {
        return {
          width: `${this.thumbSize}px`,
          height: `${this.thumbSize}px`,
          borderRadius: "50%",
          transform: this.modelValue ? `translateX(${this.width - this.thumbSize - 4}px)` : "translateX(0)",
        };
      },
      iconStyles() {
        return {
          fontSize: `${this.iconSize}px`,
        };
      }
    },
    methods: {
      toggle() {
        this.$emit("update:modelValue", !this.modelValue);
      }
    }
  };
  </script>
  
  <style scoped>
  .toggle-switch {
    background-color: #5a5a5a; /* Серый фон по умолчанию */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .toggle-switch.active {
    background-color: #2baa50; /* Зеленый цвет при включении */
  }
  
  .toggle-thumb {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    transition: transform 0.2s ease-in-out;
  }
  
  .toggle-switch.active .toggle-thumb {
    color: green; /* Зеленая иконка при включении */
  }
  </style>
  