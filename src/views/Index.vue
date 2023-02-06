<script setup>
import Header from "@/components/layout/Header.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const routeName = computed(() => route.meta.routeName);
</script>
<template>
  <div class="cuco-header px-40 flex flex-col">
    <Header class="mb-8 mt-5" />
    <h1 class="cuco-title text-4xl font-semibold mb-5 text-white">
      {{ routeName }}
    </h1>
  </div>
  <main class="px-40">
    <div class="-top-4">
      <RouterView />
    </div>
  </main>
</template>
<style lang="scss">
.cuco-header {
  background-color: #2095f2;
  height: 30vh;
}
</style>
