import { IAnswer } from '../types/answer';

const initialState: IAnswer = {
  ano: 0,
  writer: '',
  question: {
    qno: 0,
    title: '',
    writer: '',
    createdDate: '',
    question: '',
    status: '답변대기',
    images: [],
    del_flag: false,
    is_public: true,
    viewCount: 0
  },
  acontent: '',
  created_date: '',
  updated_date: undefined
};

