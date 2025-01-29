
<template>
  <div class="auth__input">
    <p v-if="label" :for="id" class="auth__text gray">{{ label }}
        <span v-if="required" class="require">*</span>
    </p>

    <!-- Поле ввода -->
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
    />
  </div>
</template>


<style>
@import url('../../assets/styles/components/InputAuthField.css');

</style>


<script>
export default {
  name: "InputAuthField",
  props: {
    id: {
      type: String,
      required: true, // ID обязателен для связи с label
    },
    type: {
      type: String,
      default: "text", // По умолчанию текстовый инпут
    },
    label: {
      type: String,
      default: "", // Метка по умолчанию отсутствует
    },
    modelValue: {
      type: String,
      default: "", // Значение по умолчанию
    },
    required: {
      type: Boolean,
      default: false, // Поле не обязательно по умолчанию
    },
    placeholder: {
      type: String,
      default: "", // Плейсхолдер опционально
    },
  },
  emits: ["update:value"], // Обновление значения при вводе
};
</script>