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
    class="rounded-md relative block w-full appearance-none border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:z-10 focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
  />
</template>
