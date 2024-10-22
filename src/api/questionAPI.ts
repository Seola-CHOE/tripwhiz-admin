import { IQuestion } from '../types/question';
import axios from 'axios';


const host = 'http://10.10.10.184:8080/api/qna';

// QnA 리스트를 가져오는 함수
export const getQuestionList = async (): Promise<IQuestion[]> => {
  try {
    // Axios GET 요청으로 Question 리스트를 가져옴
    const res = await axios.get<IQuestion[]>(`${host}/list`);

    // 응답이 성공적이면 데이터 반환
    return res.data;
  } catch (error) {
    console.error('Failed to fetch question list:', error);
    throw error; // 에러가 발생하면 호출한 곳으로 전달
  }
};