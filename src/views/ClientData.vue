<script setup>
import { reactive, onMounted, inject } from "vue";
import ClientForm from "@/components/clients/ClientForm.vue";
import { useRoute, useRouter } from "vue-router";
import { useClientStore } from "@/store/clients";

const notifyError = inject("notifyError");
const notifySuccess = inject("notifySuccess");
const clientStore = useClientStore();
const route = useRoute();
const router = useRouter();

const state = reactive({
  client: {},
  isUpdate: false,
  saving: false,
});

onMounted(async () => {
  if (route.name == "app.clientUpdate") {
    state.isUpdate = true;
    state.client = await clientStore.getClientByID(route.params.id);
  }
});

const saveClient = async (client) => {
  state.saving = true;
  let success = "";
  let message = state.isUpdate ? "atualizado" : "criado";
  if (!state.isUpdate) success = await clientStore.saveClient(client);
  else success = await clientStore.updateClient(client);

  if (success.id) {
    notifySuccess(`Cliente ${message} com sucesso`);
    setTimeout(() => {
      router.push({ name: "app.clients" });
    }, 3000);
  } else notifyError("Não foi possível executar a ação, verifique os dados");
  state.saving = false;
};
</script>
<template>
  <div>
    <div
      v-if="state.isUpdate && !state.client?.id"
      class="bg-white flex items-center justify-center h-40 p-5"
    >
      <h1 class="text-xl text-gray-500">
        Não foi possível localizar o cliente com o ID informado.
      </h1>
    </div>
    <ClientForm
      v-else
      :saving="state.saving"
      :client="state.client"
      @update:clientData="saveClient"
    />
  </div>
</template>
