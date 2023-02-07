import API from "./Api";

const getClientesByID = async (clientID) => {
  const clients = await API.get(`/clients/${clientID}`);
  return clients?.data;
};

export default getClientesByID;
