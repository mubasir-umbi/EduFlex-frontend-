import axios from "axios";
import { TUTOR_URL } from "../constants/tutorConstants";
import { ADMIN_URL } from "../constants/adminConstans";
import { CHAT_URL, USERS_URL } from "../constants/usersConstants";
import {useSelector} from 'react-redux'


// axios.defaults.withCredentials = true

export const tutorApi = axios.create({
    baseURL: TUTOR_URL,
})

export const admin = axios.create({
    baseURL: ADMIN_URL,
})

export const userApi = axios.create({
    baseURL: USERS_URL,
})

export const chatApi = axios.create({
    baseURL: CHAT_URL,
})



// Create an instance of Axios with default headers
export const userApiToken = axios.create({
  baseURL: USERS_URL,
});


const userInfo = JSON.parse(localStorage.getItem('userInfo'))



userApiToken.interceptors.request.use(
  (config) => {
    const token =  userInfo.token
    console.log(token, 'am tokennnnn');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const adminApi = axios.create({
  baseURL: ADMIN_URL,
})


adminApi.interceptors.request.use(
  (config) => {
    const token =  userInfo?.token
    console.log(token, 'am tokennnnn');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


userApiToken.interceptors.request.use(
  (config) => {
    const token =  userInfo?.token
    console.log(token, 'am tokennnnn');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const tutorApiToken = axios.create({
    baseURL: TUTOR_URL,
})

const tutorInfo = JSON.parse(localStorage.getItem('tutorInfo'))
console.log(tutorInfo, 'am tutorInfo,,,');
console.log(tutorInfo?.res?.token, 'am tokennnnn');

tutorApiToken.interceptors.request.use(
  (config) => {
    const token =  tutorInfo?.res?.token
    console.log(token, 'am tokennnnn tutor');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);