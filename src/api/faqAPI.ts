// api/faqAPI.ts

import axios from 'axios';
import { IFaq } from '../types/faq';


// API 호스트 URL 설정
const host = 'http://10.10.10.11:8080/api/faq';
const header = {
  headers: {
    'Content-Type': 'application/json',
  },
};


// FAQ 리스트를 가져오는 함수
export const getFaqList = async (): Promise<IFaq[]> => {
  try {
    const res = await axios.get<{ dtoList: IFaq[] }>(`${host}/list`);

    console.log(`Request URL: ${host}/list`);

    const res = await axios.get<{ dtoList: IFaq[] }>(`${host}/list`, header);

    console.log('Response Data:', res.data);

    return res.data.dtoList;
  } catch (error) {
    console.error('Failed to fetch FAQ list:', error);
    throw error;
  }
};

// 카테고리 리스트를 가져오는 함수
export const getCategoryList = async (): Promise<ICategory[]> => {
  try {
    const res = await axios.get<{ dtoList: ICategory[] }>(`${host}/categories`);
    return res.data.dtoList;
  } catch (error) {
    console.error('Failed to fetch category list:', error);
    throw error;
  }
};
