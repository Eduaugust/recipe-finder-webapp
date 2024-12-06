import axios from 'axios';
import env from "react-dotenv";

const REACT_APP_API_URL = env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: REACT_APP_API_URL,
});