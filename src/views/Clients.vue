<script setup>
import { reactive, onMounted, watch, inject } from "vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/form/BaseButton.vue";
import ClientsList from "@/components/clients/ClientsList.vue";
import ClientSkeleton from "@/components/clients/ClientSkeleton.vue";
import { useClientStore } from "@/store/clients";
import Pagination from "@/components/layout/Pagination.vue";

const clientStore = useClientStore();
const notifyError = inject("notifyError");
const notifySuccess = inject("notifySuccess");

const state = reactive({
  clientList: [],
  searchInput: "",
  executeSearch: null,
  pagination: {},
  currentPage: 1,
  someClientsSelected: false,
  showModal: false,
  allSelected: false,
  loading: true,
});

onMounted(async () => {
  getClientList();
});

watch(
  () => state.searchInput,
  async () => {
    clearTimeout(state.executeSearch);
    state.executeSearch = setTimeout(() => {
      searchClient();
    }, 1500);
  }
);

watch(
  () => state.currentPage,
  async () => {
    getClientList();
  }
);

const changeLoadingState = (status = true) => {
  state.loading = status;
};

const searchClient = async () => {
  changeLoadingState();
  state.currentPage = 1;
  if (state.searchInput == "") return getClientList();
  const clients = await clientStore.searchClient(state.searchInput);
  calculatePagination(clients.headers["x-total-count"]);
  state.clientList = clients.data || [];
  changeLoadingState(false);
};

const getClientList = async () => {
  changeLoadingState();
  const clients = await clientStore.getClients(state.currentPage);
  state.clientList = clients.data;
  calculatePagination(clients.headers["x-total-count"]);
  changeLoadingState(false);
};

const calculatePagination = (total) => {
  const lastPage = total % 5 == 0 ? total / 5 : Math.ceil(total / 5);
  const actualClientsInterval = state.currentPage * 5;
  const actualClientsIndex = {
    first: actualClientsInterval - 4,
    last:
      state.clientList.length == 5
        ? actualClientsInterval
        : actualClientsInterval + (state.clientList.length - 5),
  };
  const previous = state.currentPage == 1 ? 0 : state.currentPage - 1;
  const next = state.currentPage == lastPage ? 0 : state.currentPage + 1;

  state.pagination = {
    total,
    previousPage: previous,
    nextPage: next,
    clientsIndex: actualClientsIndex,
    lastPage: lastPage,
  };
};
const selectClientByID = (data) => {
  const clientIndex = state.clientList.findIndex(
    (client) => client.id == data.id
  );
  state.clientList[clientIndex].selected = data.status;
};

const selectAllClients = (checked) => {
  for (const client in state.clientList) {
    state.clientList[client].selected = checked;
  }
};

const deleteClients = async () => {
  const clientsSelecteds = state.clientList.filter((client) => client.selected);
  if (clientsSelecteds) {
    for (const client of clientsSelecteds) {
      await clientStore.deleteClient(client.id);
      notifySuccess(`Cliente ${client.name} deletado com sucesso.`);
    }
    state.showModal = false;
    state.currentPage = 1;
    getClientList();
  } else notifyError("Nenhum cliente está selecionado");
};
</script>
<template>
  <div id="cuco-clients-page" class="flex flex-col">
    <div>
      <label class="sr-only" for="searchInput"
        >Insira o nome ou CPF do cliente para pesquisar
      </label>
      <BaseInput
        id="searchInput"
        v-model="state.searchInput"
        placeholder="Pesquise por nome ou por CPF"
        name="searchInput"
      />
    </div>
    <div class="sm:hidden my-3">
      <router-link :to="{ name: 'app.newClient' }">
        <BaseButton class="w-full" variation="danger">Novo Cliente</BaseButton>
      </router-link>
    </div>
    <div>
      <ClientSkeleton v-if="state.loading" />
      <ClientsList
        v-if="!state.loading"
        :clientList="state.clientList"
        @selectAllClients="selectAllClients"
        @selectClient="selectClientByID"
        @deleteClients="deleteClients"
      />
      <Pagination
        class="mt-3"
        v-if="state.pagination.total > 0 && !state.loading"
        :pagination="state.pagination"
        :currentPage="state.currentPage"
        @update:currentPage="state.currentPage = $event"
      />
    </div>
  </div>
</template>
