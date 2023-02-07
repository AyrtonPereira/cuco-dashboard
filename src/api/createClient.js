import API from "./Api";

const createClient = async (clientData) => {
  const { ...client } = clientData;
  const clientCreated = await API.post("/clients", client);
  return clientCreated?.data;
};

export default createClient;
