import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: REACT_APP_API_URL,
});