import axios from "axios";

class API {
  constructor(options = {}) {
    this.api = axios.create({
      baseURL: "https://json-server-ashy.vercel.app/",
      timeout: 3000,
      ...options,
    });
  }

  async get(url) {
    return await this.api
      .get(url)
      .then((response) => response)
      .catch((err) => err);
  }

  async post(url, props = {}) {
    return await this.api
      .post(url, props)
      .then((response) => response)
      .catch((err) => {
        return err;
      });
  }

  async patch(url, props = {}) {
    return await this.api
      .patch(url, props)
      .then((response) => response)
      .catch((err) => {
        return err;
      });
  }
  async delete(url, props = {}) {
    return await this.api
      .delete(url, props)
      .then((response) => response)
      .catch((err) => {
        return err;
      });
  }
}

export default new API();
