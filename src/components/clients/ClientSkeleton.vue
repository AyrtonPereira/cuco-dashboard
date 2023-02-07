<script setup>
const props = defineProps({
  rows: { type: Number, default: 5 },
});
</script>
<template>
  <div class="animate-pulse w-full">
    <div
      v-for="field in rows"
      :key="field"
      class="flex flex-col w-full text-left py-3 items-center justify-around flex-wrap"
    >
      <div
        class="h-40 md:h-20 w-full bg-white mr-5 rounded-lg flex flex-col md:flex-row items-center p-5"
      >
        <div
          class="bg-gray-200 w-full md:w-5 h-10 md:h-5 rounded-md mx-2 my-2"
        ></div>
        <div
          class="bg-gray-200 w-full md:w-2/6 h-10 md:h-5 rounded-md mx-2 my-2"
        ></div>
        <div
          class="bg-gray-200 w-full md:w-2/6 h-10 md:h-5 rounded-md mx-2 my-2"
        ></div>
        <div
          class="bg-gray-200 w-full md:w-1/6 h-10 md:h-5 rounded-md mx-2 my-2"
        ></div>
        <div
          class="bg-gray-200 w-full md:w-1/6 h-10 md:h-5 rounded-md mx-2 my-2"
        ></div>
      </div>
    </div>
  </div>
</template>
