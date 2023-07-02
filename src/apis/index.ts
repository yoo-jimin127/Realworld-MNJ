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

export const postRegister = async ({ username, email, password }: RegisterProps) => {
  const res = await axios.post(`${baseURL}/users`, { user: { username, email, password } });
  return res.data;
};

export const postLogin = async ({ email, password }: LoginProps) => {
  const res = await axios.post(`${baseURL}/users/login`, { user: { email, password } });
  return res.data;
};

export const updateUserInfo = async ({ email, password, username, bio, image }: SettingProps) => {
  const res = await authHttp.put('/user', {
    user: { email, password, username, bio, image },
  });
  return res.data;
};
