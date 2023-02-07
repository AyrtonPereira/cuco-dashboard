import API from "./Api";

const searchClient = async (searchInformation) => {
  const clients = await API.get(`/clients?q=${searchInformation}`);
  return clients;
};

export default searchClient;
