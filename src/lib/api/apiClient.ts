import axios, { AxiosResponse } from 'axios';

import { serverErrorMessages } from '@/constants/serverErrorMessages';
import { env } from '@/env';
import storage from '@/lib/storage';
import { useModalStore } from '@/store/useModalStore';

const baseUrl = env.appServerUrl;

export const defaultAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

defaultAxios.interceptors.request.use((config) => {
  const token = storage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

defaultAxios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const apiServerStatus = response.data.status;
    const apiServerMessage = response.data.message;

    if (apiServerStatus === 'ERR') {
      useModalStore.getState().setModalType('normal');
      useModalStore.getState().setTitle('Error');
      useModalStore.getState().setSeverity('error');
      useModalStore
        .getState()
        //@ts-expect-error error message
        .setContent(serverErrorMessages[apiServerMessage]);
      useModalStore.getState().setOpen(true);

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        config: response.config,
        headers: response.headers,
      };
    } else {
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        config: response.config,
        headers: response.headers,
      };
    }
  },
  (error) => {
    useModalStore.getState().setOpen(true);
    useModalStore.getState().setTitle('Error');
    useModalStore.getState().setContent('msg');
    Promise.reject(error);
    return {};
  },
);
