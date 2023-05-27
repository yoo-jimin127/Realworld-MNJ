import axios from 'axios';

const baseURL = `#`;

// TODO : api 문서 연결
export const getResult = async () => {
  const res = await axios.get(`${baseURL}/`);
  return res.data;
}