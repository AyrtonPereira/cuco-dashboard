<script setup>
import { reactive, watch } from "vue";
import ClientItem from "@/components/clients/ClientItem.vue";
import Modal from "@/components/layout/Modal.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
const props = defineProps({
  clientList: { type: Array },
});

const state = reactive({
  showModal: false,
  someClientsSelected: false,
});

const emits = defineEmits(["selectClient", "selectAll", "deleteClients"]);

const selectAllClients = (value) => {
  emits("selectAllClients", value);
};

const selectClientById = (value) => {
  emits("selectClient", value);
};

const deleteClients = (value) => {
  emits("deleteClients", value);
  state.showModal = false;
};

watch(
  () => props.clientList,
  async () => {
    const someSelected = props.clientList.some((client) => client?.selected);
    if (someSelected) state.someClientsSelected = true;
    else state.someClientsSelected = false;
  },
  { deep: true }
);
</script>
<template>
  <div>
    <div
      class="md:p-5 my-4 flex flex-col md:flex-row justify-start items-center text-left"
    >
      <div
        class="w-full md:w-16 flex flex-row-reverse items-center justify-end"
      >
        <span class="md:sr-only ml-5 client-list-titles"
          >Selecionar Todos os Clientes</span
        >
        <input
          type="checkbox"
          @click="selectAllClients($event.target.checked)"
        />
      </div>
      <div class="w-2/6 hidden md:block client-list-titles">Nome</div>
      <div class="w-2/6 hidden md:block client-list-titles">
        Data de Nascimento
      </div>
      <div class="w-2/6 hidden md:block client-list-titles">Telefone</div>
      <div class="w-full md:w-1/6 md:block mt-3 md:mt-0">
        <BaseButton
          class="w-full flex items-center justify-center md:w-auto"
          variation="danger"
          v-if="state.someClientsSelected"
          @click="state.showModal = true"
        >
          <TrashIcon class="w-5 h-5 mr-2" />
          <span>Excluir</span>
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col">
      <div v-if="props.clientList.length > 0">
        <ClientItem
          v-for="client in props.clientList"
          :key="client.id"
          @update:clientSelected="selectClientById($event)"
          :client="client"
        />
      </div>
      <div
        v-else
        class="bg-white w-full rounded h-20 flex justify-center items-center p-5 text-gray-600 mt-5"
      >
        <h1 class="">Nenhum cliente localizado</h1>
      </div>
    </div>
    <Modal :isOpen="state.showModal">
      <div class="flex flex-col items-center justify-center client-list-modal">
        <div>
          <img src="@/assets/warning-icon.svg" class="w-14 h-14 mb-4" />
        </div>
        <div class="w-full text-center"><span class="title">Atenção</span></div>
        <div class="text-center my-4">
          <span class="modal-text text-center">
            Você tem certeza que quer excluir os cliente(s) selecionado(s)?
          </span>
        </div>
        <div class="flex">
          <BaseButton
            @click="state.showModal = false"
            variation="secondary"
            label="Cancelar"
          />
          <BaseButton
            class="px-5"
            variation="danger"
            label="Excluir"
            @click="deleteClients"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>
<style lang="scss" scoped>
.client-list-titles {
  font-family: "Poppins";
  font-weight: 600;
  color: #969cb3;
  font-size: 13px;
}

.client-list-modal {
  font-family: "Poppins";

  .title {
    font-size: 18px;
    font-weight: 600;
  }
  .modal-text {
    color: #718096;
  }
}
</style>
