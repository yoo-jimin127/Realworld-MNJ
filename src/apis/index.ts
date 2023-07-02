import axios from 'axios';
import { RegisterProps, LoginProps, SettingProps } from './types';

const baseURL = `https://api.realworld.io/api`;
const token = localStorage.getItem('token');

const authHttp = axios.create({
  baseURL,
  headers: {
    Authorization: `Token ${token}`,
  },
});

const http = axios.create({
  baseURL,
});

export const postRegister = async ({ username, email, password }: RegisterProps) => {
  const res = await http.post(`$/users`, { user: { username, email, password } });
  return res.data;
};

export const postLogin = async ({ email, password }: LoginProps) => {
  const res = await http.post(`/users/login`, { user: { email, password } });
  return res.data;
};

export const updateUserInfo = async ({ email, password, username, bio, image }: SettingProps) => {
  const res = await authHttp.put('/user', {
    user: { email, password, username, bio, image },
  });
  return res.data;
};

export const getMyArticles = async (username: string) => {
  const res = await http.get('/articles', {
    params: {
      author: username,
      limit: 5,
      offset: 0,
    },
  });
  return res.data;
};

export const getFavoritedArticles = async (username: string) => {
  const res = await http.get('/articles', {
    params: {
      favorited: username,
      limit: 5,
      offset: 0,
    },
  });
  return res.data;
};
