import { IQuestion } from '../types/question';
import { useState } from 'react';
import { string } from 'prop-types';


const initialState: IQuestion[] = [
{
  'qno': 0,
  'title': '',
  'writer': '',
  'createdDate': '',
  'question': '',
  'status': '답변대기',
  'images': [],
  'del_flag': false,
  'is_public': true,
  'viewCount': 0,

  }
];

const UseQuestion = (qno: string | undefined) => {

  const [questions, setQuestions] = useState<IQuestion[]>(initialState);

  return {questions, setQuestions};
};

export default UseQuestion;