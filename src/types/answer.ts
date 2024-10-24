// Q&A 데이터 타입 정의
import { IQuestion } from './question';

export interface IAnswer {
  ano: number;
  writer: string;
  question: IQuestion;
  acontent: string;
  created_date: string;
  updated_date?: string;
}

