import axios from 'axios';
import config from '../config';

export class Api {
  static instance = null;

  static get $instance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  client = null;
  language = config.language.default;
  headers = {};

  setLanguage(language) {
    this.language = language;
  }

  setHeader(header, value) {
    this.headers[header] = value;
    this.client = null;

    return Api.$instance;
  }

  removeHeader(header) {
    delete this.headers[header];
    this.client = null;

    return Api.$instance;
  }

  async get(url, config) {
    // const fullConfig = this.createFullConfig(config);
    this.initClient();

    try {
      const res = await this.client.get(url, config);

      return res.data;
    } catch (e) {
      return e.response;
    }
  }

  async post(url, credentials = {}, config) {
    // const fullConfig = this.createFullConfig(config);
    this.initClient();

    try {
      const res = await this.client.post(url, credentials, config);

      return res.data;
    } catch (e) {
      return e.response;
    }
  }

  async put(url, credentials = {}, config) {
    // const fullConfig = this.createFullConfig(config);
    this.initClient();

    try {
      const res = await this.client.put(url, credentials, config);

      return res.data;
    } catch (e) {
      return e.response;
    }
  }

  async delete(url, config) {
    // const fullConfig = this.createFullConfig(config);
    this.initClient();

    try {
      const res = await this.client.delete(url, config);

      return res.data;
    } catch (e) {
      return e.response;
    }
  }

  initClient() {
    if (!this.client) {
      this.client = axios.create({
        baseURL: config.api.urls.baseUrl,
        headers: this.headers,
      });
    }

    return this.client;
  }

  createFullConfig(config) {
    const language = {
      'language': this.language,
    };

    if (!config) {
      return {
        params: { ...language },
      }
    }

    config.params = {...config.params, ...language};

    return config;
  }
}
