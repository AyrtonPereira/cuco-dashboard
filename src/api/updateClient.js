import API from "./Api";

const updateClient = async (clientData) => {
  const { id, ...client } = clientData;
  const clientUpdated = await API.patch(`/clients/${id}`, client);
  return clientUpdated?.data;
};

export default updateClient;
