<template>
    <div
      class="radio-checkbox"
      :class="{ 'checked': isChecked }"
      @click="selectRadio"
      :style="radioStyles"
    >
      <div class="inner-circle">
        <div v-if="isChecked" class="inner-ball"></div> <!-- Маленький шарик при выборе -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: [String, Number, Boolean], // Для работы с v-model
      name: String, // Имя группы для выбора одного варианта
      value: [String, Number], // Значение для выбора
      size: {
        type: Number,
        default: 30 // Размер радиокнопки по умолчанию
      }
    },
    computed: {
      isChecked() {
        return this.modelValue === this.value; // Проверяем, выбрано ли текущее значение
      },
      radioStyles() {
        return {
          width: `${this.size}px`,
          height: `${this.size}px`,
          borderRadius: `${this.size / 2}px`,
        };
      }
    },
    methods: {
      selectRadio() {
        this.$emit("update:modelValue", this.value); // Устанавливаем выбранное значение
      }
    }
  };
  </script>
  
  <style scoped>
.radio-checkbox {
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.radio-checkbox .inner-circle {
  width: 14px; /* Увеличиваем диаметр внутреннего круга */
  height: 14px;
  border-radius: 50%;
  background-color: transparent; /* Пустой круг по умолчанию */
  transition: background-color 0.2s ease-in-out;
}

.radio-checkbox.checked .inner-circle {
  background-color: white; /* Белый цвет круга при выборе */
}

.inner-ball {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>