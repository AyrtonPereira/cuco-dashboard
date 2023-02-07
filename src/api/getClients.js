import API from "./Api";

const getClients = async (page) => {
  const clients = await API.get(`/clients?_limit=5&_page=${page ? page : 1}`);
  return clients;
};

export default getClients;
