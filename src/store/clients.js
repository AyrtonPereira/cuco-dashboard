import { defineStore } from "pinia";
import getClientByID from "@/api/getClientByID";
import createClient from "@/api/createClient";
import updateClient from "@/api/updateClient";
import searchClient from "@/api/searchClient";
import getClients from "@/api/getClients";
import deleteClient from "@/api/deleteClient";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [],
  }),
  getters: {},
  actions: {
    async getClients(page) {
      const clients = await getClients(page);
      this.clients = clients.data || [];
      return clients;
    },
    async getClientByID(clientID) {
      const client = await getClientByID(clientID);
      return client;
    },
    async saveClient(clientData) {
      const clientCreated = await createClient(clientData);
      return clientCreated;
    },
    async updateClient(clientData) {
      const clientUpdated = await updateClient(clientData);
      return clientUpdated;
    },
    async searchClient(searchInformation) {
      const clients = await searchClient(searchInformation);
      this.clients = clients.data || [];
      return clients;
    },
    async deleteClient(clientID) {
      const clienteDeleted = await deleteClient(clientID);
      return clienteDeleted;
    },
  },
  persist: true,
});
