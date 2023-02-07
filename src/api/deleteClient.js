import API from "./Api";

const deleteClient = async (clientID) => {
  const clientDeleted = await API.delete(`/clients/${clientID}`);
  return clientDeleted.data;
};

export default deleteClient;
