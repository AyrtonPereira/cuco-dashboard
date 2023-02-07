<script setup>
const props = defineProps({
  variation: { type: String, default: "primary" },
  label: { type: String },
  loading: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const buttonPills = {
  primary: "cuco-color-primary text-white border-transparent",
  secondary: "cuco-color-secondary border-transparent background-transparent",
  danger:
    "cuco-color-danger text-white border-transparent focus:border-none focus:outline-none",
};
</script>
<template>
  <button
    :class="`transition-all duration-200 flex justify-center rounded-md border py-2 px-5 text-sm font-medium  ${
      buttonPills[variation]
    }
    ${loading ? 'opacity-20 animate-pulse pointer-events-none' : ''} 
    ${blocked ? 'pointer-events-none opacity-20' : ''}`"
  >
    <slot>{{ label }}</slot>
  </button>
</template>
<style lang="scss" scoped>
.cuco-color-danger {
  background-color: #ee2279;
  transition: all 0.3s;
  &:hover {
    background-color: #db1f71;
  }
}

.cuco-color-secondary {
  color: #969cb2;
}

.cuco-color-primary {
  background-color: #12a454;
  transition: all 0.3s;
  &:hover {
    background-color: #118344;
  }
}
</style>
