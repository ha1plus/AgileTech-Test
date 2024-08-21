'use client';

import axios from 'axios';
import cookie from 'js-cookie';
import { clearTokens, setTokens } from '@/lib/features/user/userSlice';
import { useAppStore, useAppDispatch } from '@/lib/hook';

const useAxiosInstance = () => {
  const store = useAppStore();
  const dispatch = useAppDispatch();

  const axiosInstance = axios.create({
    baseURL: 'https://api-test-web.agiletech.vn/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const state = store.getState();
      const accessToken = state.user.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = cookie.get('refreshToken');
          const response = await axiosInstance.post('/auth/refreshToken', { token: refreshToken });

          const { accessToken } = response.data;
          dispatch(setTokens({ accessToken }));

          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } catch (err) {
          dispatch(clearTokens());
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;