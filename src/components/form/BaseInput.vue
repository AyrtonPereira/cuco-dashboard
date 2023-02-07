<script setup>
import { Field } from "vee-validate";
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <Field
    v-model="value"
    class="rounded relative block font-sans w-full focus:outline-none text-gray-400 placeholder-gray-400 appearance-none border px-3 py-3 sm:text-sm"
  />
</template>
