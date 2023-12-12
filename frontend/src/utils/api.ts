/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useAuth } from "../components/AuthContext";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const axiosRequest = (
  token: string | undefined,
  path: string,
  method: string,
  url: string | undefined,
  params?: string,
  body?: any
) => {
  return axios.request({
    url: `${url}/${path}${params ? params : ""}`,
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

// export const getAllData = async (filters = null, queryString = '') => {

//   let params = "";
//   if (filters) {
//     const { startPeriod, endPeriod } = filters
//     params = `?startPeriod=${startPeriod}&endPeriod=${endPeriod}`
//   }

//   const response = (await axiosRequest(`kanban/all${queryString}`, 'GET', API_URL + "/api", params));

//   if (response) {
//     return response.data
//   }

//   return [];
// };

// export const redirectLoan = (id) => {
//   window.open(
//     `${API_URL}/admin/loans/${id}`,
//     '_blank'
//   );
// }

// export const getLoanForCollumn = async (column: string, filters = null, queryString = '') => {
//   const response = (await axiosRequest(`kanban/${column}${queryString}`, 'GET', API_URL + "/api",''));

//   if (response) {
//     return response.data
//   }

//   return [];
// }
// export const getLoanForCollumnById = async (column: string, filters = null, queryString = '') => {
//   const response = (await axiosRequest(`kanban/${column}${queryString}`, 'GET', API_URL + "/api",''));

//   if (response) {
//     return response.data
//   }

//   return [];
// }
