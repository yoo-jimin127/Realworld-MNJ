import axios from 'axios';
import { RegisterProps, LoginProps, SettingProps, ArticleProps } from './types';

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

export const postRegister = async (user: RegisterProps) => {
  const res = await http.post(`/users`, { user });
  return res.data;
};

export const postLogin = async (user: LoginProps) => {
  const res = await http.post(`/users/login`, { user });
  return res.data;
};

export const getUserInfo = async () => {
  const res = await authHttp.get(`/user`);
  return res.data;
};

export const updateUserInfo = async ({ email, password, username, bio, image }: SettingProps) => {
  const res = await authHttp.put('/user', {
    user: { email, password, username, bio, image },
  });
  return res.data;
};

export const getGlobalArticle = async () => {
  const res = await http.get('/articles');
  return res.data;
};

export const getFeedArticle = async () => {
  const res = await authHttp.get('/articles/feed');
  return res.data;
};

export const getMyArticles = async (username: string) => {
  const res = await authHttp.get('/articles', {
    params: {
      author: username,
    },
  });
  return res.data;
};

export const getFavoritedArticles = async (username: string) => {
  const res = await authHttp.get('/articles', {
    params: {
      favorited: username,
    },
  });
  return res.data;
};

export const createArticle = async (article: ArticleProps) => {
  const res = await authHttp.post(`${baseURL}/articles`, {
    article,
  });
  return res.data;
};

export const getArticle = async (slug: string) => {
  const res = await authHttp.get(`/articles/${slug}`);
  return res.data;
};

export const updateArticle = async (article: ArticleProps, slug: string) => {
  const res = await authHttp.put(`/articles/${slug}`, {
    article,
  });
  return res.data;
};

export const deleteArticle = async (slug: string) => {
  const res = await authHttp.delete(`/articles/${slug}`);
  return res;
};

export const getProfile = async (username: string) => {
  const res = await authHttp.get(`/profiles/${username}`);
  return res.data;
};

export const followUser = async (username: string) => {
  const res = await authHttp.post(`/profiles/${username}/follow`);
  return res.data;
};

export const unfollowUser = async (username: string) => {
  const res = await authHttp.delete(`/profiles/${username}/follow`);
  return res.data;
};

export const favoriteArticle = async (slug: string) => {
  const res = await authHttp.post(`/articles/${slug}/favorite`);
  return res.data;
};

export const unfavoriteArticle = async (slug: string) => {
  const res = await authHttp.delete(`/articles/${slug}/favorite`);
  return res.data;
};

export const getTags = async () => {
  const res = await http.get('/tags');
  return res.data;
}