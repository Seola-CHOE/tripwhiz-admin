import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select, SelectChangeEvent,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow, Typography
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, useEffect, useState } from 'react';
import { IQuestion, QuestionStatus } from '../../types/question';
import useQuestion from '../../hooks/useQuestion';
import { getQuestionList } from '../../api/questionAPI';
import Label from '../../components/Label';
import { useNavigate } from 'react-router-dom';


// interface Filters {
//   status?: QuestionStatus;
// }
//
// interface QnaListComponentProps {
//   questions: IQuestion[]; // 부모로부터 질문 배열을 전달받는 props
// }

// 상태 레이블을 반환하는 함수
const getStatusLabel = (status: QuestionStatus): JSX.Element => {
  const statusMap: Record<QuestionStatus, { text: string; color: 'success' | 'warning' }> = {
    답변완료: { text: '답변완료', color: 'success' },
    답변대기: { text: '답변대기', color: 'warning' },
  };

  const { text, color } = statusMap[status] || statusMap['pending'];
  return <Label color={color}>{text}</Label>;
};


// 필터링 기능
const applyFilters = (
  questions: IQuestion[],
  status?: QuestionStatus
): IQuestion[] => {
  return questions.filter((question) => {
    if (status === undefined) return true; // 필터가 없으면 모든 질문을 반환
    return question.status === status; // 필터가 있으면 해당 상태와 일치하는 질문만 반환
  });
};



function QnaListComponent() {

  const { questions, setQuestions } = useQuestion(undefined);
  const [filterStatus, setFilterStatus] = useState<QuestionStatus | undefined>();

  const navigate = useNavigate(); // useNavigate 훅 사용_SA

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionList(); // API 호출
        setQuestions(data); // 상태에 데이터 저장
      } catch (error) {
        console.error('Error fetching QnA list:', error);
      }
    };
    fetchQuestions();
  }, [setQuestions]);



  // id는 필터링에 사용할 값이고, name은 UI에 표시할 이름
  const statusOptions = [
    {
      id: 'all',    // 'All' 상태를 선택하면 필터링이 적용되지 않습니다.
      name: '전체'
    },
    {
      id: '답변대기',
      name: '답변 대기'
    },
    {
      id: '답변완료',
      name: '답변 완료'
    }
    ];

  // 상태 변경 핸들러
  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value === 'all' ? undefined : e.target.value as QuestionStatus;
    setFilterStatus(value); //필터 상태 업데이트
  };

  const filteredQuestions = applyFilters(questions, filterStatus);
  console.log(filteredQuestions);

  // 질문 클릭 시 상세 페이지로 이동하는 함수_SA
  const handleQuestionClick = (qno: number) => {
    navigate(`/qna/read/${qno}`); // 질문 번호에 해당하는 상세 페이지로 이동
  };

  return (
    <Card>

      {/*헤더*/}
      <CardHeader
        action={
          <Box width={150}>
            {/* 상태 필터를 위한 드롭다운을 표시합니다. */}
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus || 'all'} // 필터링된 상태 값 또는 기본 값 'all'
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
        title="Recent Questions"
      />

      {/* 카드와 테이블의 구분선 */}
      <Divider />

      {/* 테이블을 담는 컨테이너 */}
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: '#FCFBF0' }}>
            <TableCell align="center">No.</TableCell>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">상태</TableCell>
            <TableCell align="center">작성자</TableCell>
            <TableCell align="center">작성일</TableCell>
            <TableCell align="center">조회수</TableCell>
          </TableHead>

          <TableBody>
            {/* 필터링된 question 배열을 순회하며 테이블의 각 행을 생성 */}
            {filteredQuestions.length > 0? (
              filteredQuestions.map((question) => {
                return (
                  <TableRow
                    hover
                    key={question.qno}
                    onClick={() => handleQuestionClick(question.qno)} // 클릭 시 상세 페이지로 이동_SA

                  >
                    {/* 질문 번호 */}
                    <TableCell align="center">{question.qno}</TableCell>

                    {/* 질문 제목 */}
                    <TableCell align="left" style={{ width: '450px' }}>
                      <Typography variant="body1" fontWeight="bold" noWrap>
                        {question.title}
                      </Typography>
                    </TableCell>

                    {/* 질문 상태 */}
                    <TableCell align="center">
                      {/*{question.status === 'pending' ? '답변 대기' : '답변 완료'}*/}
                      {getStatusLabel(question.status)}
                    </TableCell>

                    {/* 작성자 */}
                    <TableCell align="center">
                      {question.writer}
                    </TableCell>

                    {/* 작성일 */}
                    <TableCell align="center">
                      {new Date(question.createdDate).toLocaleDateString()}
                    </TableCell>

                    {/* 조회수 */}
                    <TableCell align="center">
                      {question.viewCount}
                    </TableCell>
                  </TableRow>
                );
              })
            ):(
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No questions available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </Card>
  );
}

export default QnaListComponent;