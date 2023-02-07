<script setup>
const props = defineProps({
  pagination: { type: Object },
  currentPage: { type: Number },
});
const emit = defineEmits(["update:currentPage"]);

const updateCurrentPage = (value) => {
  emit("update:currentPage", value);
};
</script>
<template>
  <div>
    <div v-if="pagination.total > 0" class="flex justify-between">
      <div>
        <span class="current-clients-text font-semibold"
          >{{ pagination.clientsIndex?.first }} -
          {{ pagination.clientsIndex?.last }}
          <span class="font-normal">de</span> {{ pagination.total }}</span
        >
      </div>
      <div class="pagination-text">
        <span
          v-if="currentPage != 1 && pagination.previousPage != 1"
          @click="updateCurrentPage(1)"
          class="p-2"
        >
          1
        </span>
        <span
          v-if="pagination.previousPage - 1 > 1 && pagination.previousPage > 0"
          >...</span
        >
        <span
          v-if="pagination.previousPage != 0"
          @click="updateCurrentPage(pagination.previousPage)"
          class="p-2"
        >
          {{ pagination.previousPage }}
        </span>

        <span class="current-page py-1 px-2 rounded">{{ currentPage }}</span>
        <span
          @click="updateCurrentPage(pagination.nextPage)"
          class="p-2"
          v-if="pagination.nextPage != 0"
        >
          {{ pagination.nextPage }}
        </span>
        <span
          v-if="
            pagination.lastPage - pagination.nextPage > 1 &&
            pagination.nextPage > 0
          "
          >...</span
        >
        <span
          @click="updateCurrentPage(pagination.lastPage)"
          v-if="
            currentPage != pagination.lastPage &&
            pagination.nextPage != pagination.lastPage
          "
          class="p-2"
        >
          {{ pagination.lastPage }}
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.current-clients-text {
  font-family: "Poppins";
  font-size: 13px;
  color: #969cb3;
}

.pagination-text {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 12px;
  color: #969cb3;
  cursor: pointer;
  transition: all 0.3s;
}

.current-page {
  background-color: #2095f2;
  color: white;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #1d7cca;
  }
}
</style>
