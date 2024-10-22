import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow, Typography
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, useState } from 'react';
import { IQuestion, QuestionStatus } from '../../types/question';
import useQuestion from '../../hooks/useQuestion';


interface Filters {
  status?: QuestionStatus;
}

interface QnaListComponentProps {
  questions: IQuestion[]; // 부모로부터 질문 배열을 전달받는 props
}

const applyFilters = (
  questions: IQuestion[], // IQuestion 배열을 받음
  filters: Filters // 상태 필터 적용
): IQuestion[] => {
  return questions.filter((question) => {
    let matches = true;

    // status 필터가 설정되어 있고, 질문의 상태와 일치하지 않으면 matches를 false로 설정
    if (filters.status && question.status !== filters.status) {
      matches = false;
    }
    return matches; // 조건에 맞는 질문만 반환
  });
};



function QnaListComponent() {

  const {questions} = useQuestion(undefined); // UseQuestion 훅 호출하여 questions 가져오기
  const [filters, setFilters] = useState<Filters>({
    status: null
  });



  // id는 필터링에 사용할 값이고, name은 UI에 표시할 이름
  const statusOptions = [
    {
      id: 'all',    // 'All' 상태를 선택하면 필터링이 적용되지 않습니다.
      name: '전체'
    },
    {
      id: 'pending',
      name: '답변 대기'
    },
    {
      id: 'answered',
      name: '답변 완료'
    }
    ];

  // 상태 변경을 처리하는 함수입니다. 사용자가 드롭다운에서 다른 상태를 선택할 때 호출
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    // 사용자가 'All'을 선택하지 않았다면, 선택된 상태 값을 value에 할당
    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const filteredQuestions = applyFilters(questions, filters);


  return (
    <Card>

      {/*헤더*/}
      <CardHeader>
        action={
          <Box width={150}>
            {/* 상태 필터를 위한 드롭다운을 표시합니다. */}
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || 'all'} // 필터링된 상태 값 또는 기본 값 'all'
                onChange={handleStatusChange}   // 상태 변경 핸들러
                label="Status"
                autoWidth
              >
                {/* statusOptions 배열을 순회하며, 각 옵션을 드롭다운에 표시합니다. */}
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Recent Orders"
      </CardHeader>

      {/* 카드와 테이블의 구분선 */}
      <Divider />

      {/* 테이블을 담는 컨테이너 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>No.</TableCell>
            <TableCell align="left">제목</TableCell>
            <TableCell>상태</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell>작성일</TableCell>
            <TableCell>조회수</TableCell>
          </TableHead>

          <TableBody>
            {/* question 배열을 순회하며 테이블의 각 행을 생성 */}
            {filteredQuestions.map((question) => (
              <TableRow key={question.qno}>
                {/* 질문 번호 */}
                <TableCell>{question.qno}</TableCell>

                {/* 질문 제목 */}
                <TableCell align="left">
                  <Typography variant="body1" fontWeight="bold" noWrap>
                    {question.title}
                  </Typography>
                </TableCell>

                {/* 질문 상태 */}
                {/*<TableCell>{question.status}</TableCell>*/}
                <TableCell>{question.status === 'pending' ? '답변 대기' : '답변 완료'}</TableCell>

                {/* 작성자 */}
                <TableCell>{question.writer}</TableCell>

                {/* 작성일 */}
                <TableCell>{question.created_at.toLocaleDateString()}</TableCell>

                {/* 조회수 */}
                <TableCell>{question.view_count}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

    </Card>
  );
}

export default QnaListComponent;