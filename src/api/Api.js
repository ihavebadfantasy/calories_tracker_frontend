import axios from 'axios';
import config from '../config';
import { LOGIN_URL, REGISTER_URL, REFRESH_URL } from './urls';
import setAccessTokens from '../helpers/setAccessTokens';

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
  excludeRefreshUrls = [
    LOGIN_URL, REGISTER_URL,
  ]

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
      if (e.response) {
        return this.errorHandler(e.response, 'get', url, config);
      }
    }
  }

  async post(url, credentials = {}, config) {
    // const fullConfig = this.createFullConfig(config);
    this.initClient();

    try {
      const res = await this.client.post(url, credentials, config);
      return res.data;
    } catch (e) {
      if (e.response) {
        return this.errorHandler(e.response, 'post', url, config);
      }
    }
  }

  async put(url, credentials = {}, config) {
    // const fullConfig = this.createFullConfig(config);
    this.initClient();

    try {
      const res = await this.client.put(url, credentials, config);

      return res.data;
    } catch (e) {
      if (e.response) {
        return this.errorHandler(e.response, 'put', url, config);
      }
    }
  }

  async delete(url, config) {
    // const fullConfig = this.createFullConfig(config);
    this.initClient();

    try {
      const res = await this.client.delete(url, config);

      return res.data;
    } catch (e) {
      if (e.response) {
        return this.errorHandler(e.response, 'delete', url, config);
      }
    }
  }

  async errorHandler(e, method, url, config) {
    switch (e.status) {
      case 401:
        return await this.handle401Error(e, method, url, config);
      default:
        return e;
    }
  }

  async handle401Error(e, method, url, config) {
    if (this.excludeRefreshUrls.includes(url)) {
      return e;
    }

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return e;
    }

    this.excludeRefreshUrls.push(url);

    try {
      const refreshRes = await this.post(REFRESH_URL, { refreshToken });
      setAccessTokens(refreshRes.data.accessToken, refreshRes.data.refreshToken);
      const res = await this[method](url, config);
      this.excludeRefreshUrls.pop();

      return res;
    } catch (e) {
      this.excludeRefreshUrls.pop();
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
