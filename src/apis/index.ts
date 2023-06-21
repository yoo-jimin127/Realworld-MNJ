import axios from 'axios';
import { RegisterProps, LoginProps } from './types';

const baseURL = `https://api.realworld.io/api`;

// TODO : api 문서 연결
export const postRegister = async ({ username, email, password }: RegisterProps) => {
  const res = await axios.post(`${baseURL}/users`, { user: { username, email, password } });
  return res.data;
};

export const postLogin = async ({ email, password }: LoginProps) => {
  const res = await axios.post(`${baseURL}/users/login`, { user: { email, password } });
  return res.data;
};
