// api/faqAPI.ts

import axios from 'axios';
import { IFaq } from '../types/faq';


const host = 'http://10.10.10.11:8080/api/faq';
const header = {
  headers: {
    'Content-Type': 'application/json',
  },
};


export const getFaqList = async (): Promise<IFaq[]> => {
  try {

    console.log(`Request URL: ${host}/list`);

    const res = await axios.get<{ dtoList: IFaq[] }>(`${host}/list`, header);

    console.log('Response Data:', res.data);

    return res.data.dtoList;
  } catch (error) {
    console.error('Failed to fetch FAQ list:', error);
    throw error;
  }
};
