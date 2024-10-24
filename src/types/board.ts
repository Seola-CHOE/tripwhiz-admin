export interface IBoard {
    bno : number; //게시글번호
    title : string; //게시글제목
    bcontent : string; //게시글내용
    writer: string; // 작성자
    viewCount: number; //조회수
    delFlag: boolean; // 삭제 여부
    createdDate: string; // 생성일
    updatedDate: string; //수정일
}