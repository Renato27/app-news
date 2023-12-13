import axios from "axios";
import { keycloakConfig } from "./auth";
import { KeycloakTokenParsed } from "keycloak-js";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const keycloakUrl = process.env.REACT_APP_KEYCLOAK_URL;

export const axiosRequest = (
  token: string | undefined,
  path: string,
  method: string,
  url: string | undefined,
  params?: string,
  body?: any
) => {
    const urlReplaced = url ? url + '/' : "";
  return axios.request({
    url: `${urlReplaced}${path}${params ? params : ""}`,
    method,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProviders = async (token: string | undefined) => {
    try {
        const response = await axiosRequest(token, `provider`, "GET", backendUrl);

        if (response) {
            return response.data.data;
        }

        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
  
};

export const getNews = async (token: string | undefined, providersId: string | undefined) => {
    try {
        const response = await axiosRequest(token, `news/${providersId}`, "GET", backendUrl);

        if (response) {
          return response.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
};

export const getNewsByUserSettings = async (token: string | undefined, providersId: string | undefined) => {
    try {
        const response = await axiosRequest(token, `news/user/provider/${providersId}`, "GET", backendUrl);

        if (response) {
          return response.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
};

export const getCategories = async (token: string | undefined, providersId: string | undefined) => {
    try {
        const response = await axiosRequest(token, `category/provider/${providersId}`, "GET", backendUrl);

        if (response) {
          return response.data.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
}

export const getSources = async (token: string | undefined, providersId: string | undefined) => {
    try {
        const response = await axiosRequest(token, `source/provider/${providersId}`, "GET", backendUrl);

        if (response) {
          return response.data.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
}

export const getAuthors = async (token: string | undefined, providersId: string | undefined) => {
    try {
        const response = await axiosRequest(token, `author/provider/${providersId}`, "GET", backendUrl);

        if (response) {
          return response.data.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
}

export const getProvider = async (token: string | undefined, providersId: string | undefined) => {
    try {
        const response = await axiosRequest(token, `provider/${providersId}`, "GET", backendUrl);

        if (response) {
          return response.data.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
}

export const getNewsPerPage = async (token: string | undefined, pageUrl: string) => {
    try {
        const response = await axiosRequest(token, pageUrl, "GET", undefined);

        if (response) {
          return response.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
};

export const filters = async (token: string | undefined, providersId: string | undefined, params: string) => {
    try {
        const response = await axiosRequest(token, `news/${providersId}`, "GET", backendUrl, params);

        if (response) {
          return response.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
}

export const saveAttributesKeycloak = async (token: string | undefined, tokenParsed: KeycloakTokenParsed, attributes: object) => {
    try {
        console.log(attributes);
        const realm = keycloakConfig.realm;
        const id = tokenParsed.sub;
        const body = {
            attributes: attributes
        }
        const response = await axiosRequest(token, `admin/realms/${realm}/users/${id}`, "PUT", keycloakUrl, undefined, body);
        console.log(response);
        if (response) {
          return response.data;
        }
      
        return [];
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
};