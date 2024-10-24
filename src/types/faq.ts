// FAQ 데이터 인터페이스 정의
export interface IFaq {
  fno: number;
  question: string;
  answer: string;
  del_flag: boolean;
  view_cnt: number;
  cno: number; // 카테고리 번호
  category : ICategory;
}

// 카테고리 데이터 인터페이스 정의
export interface ICategory {
  cno: number; // 카테고리 번호
  cname: string; // 카테고리 이름
}
