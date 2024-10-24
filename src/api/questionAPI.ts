import { IQuestion } from '../types/question';
import axios from 'axios';

const host = 'http://10.10.10.11:8080/api/que';

//응답 데이터 타입 정의
interface QuestionResponse {
  dtoList: IQuestion[];  // dtoList 배열에 IQuestion 타입이 포함됨
}

// QnA 리스트를 가져오는 함수
export const getQuestionList = async (): Promise<IQuestion[]> => {
  try {
    // Axios GET 요청으로 Question 리스트를 가져옴
    const res = await axios.get<QuestionResponse>(`${host}/list`);
    console.log('Fetched Data:', res.data); // 데이터 확인
    // 응답이 성공적이면 데이터 반환
    return res.data.dtoList;
  } catch (error) {
    console.error('Failed to fetch question list:', error);
    throw error; // 에러가 발생하면 호출한 곳으로 전달
  }
};