
import { Box, Card, CardContent, Typography, TextField, Button, CircularProgress, FormControl, SelectChangeEvent } from '@mui/material';
import { IQuestion } from '../../types/question';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';



const initState: IQuestion = {
  qno: 0,
  title: '',
  writer: '',
  created_at: new Date(),
  question: '',
  status: 'pending',
  images: [],
  del_flag: false,
  is_public: true,
  view_count: 0,
  answer: '',
};

function QnaReadComponent() {
  const [qna, setQna] = useState<IQuestion>({ ...initState });
  const [answer, setAnswer] = useState(''); // 관리자 답변 상태
  const [loading, setLoading] = useState(false);
  const { qno } = useParams<{ qno: string }>(); // URL에서 qno 추출
  const navigate = useNavigate();

  // 질문 데이터를 불러오는 함수 (예시)
  useEffect(() => {
    // 실제 API 호출로 질문 데이터를 불러옴 (예시 데이터)
    const fetchedQna: IQuestion = {
      qno: 1,
      title: '예시 질문 제목',
      writer: '사용자1',
      question: '이것은 예시 질문입니다.',
      created_at: new Date(),
      status: 'pending',
      images: [],
      del_flag: false,
      is_public: true,
      view_count: 0,
      answer: '',
    };
    setQna(fetchedQna); // fetchedQna 사용
  }, [qno]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleCancel = () => {
    setLoading(true);
    // 답변 취소 API 호출 (예시)
    setTimeout(() => {
      console.log('답변 취소');
      setLoading(false);
      navigate('/qna/list'); // 제출 후 Q&A 리스트로 이동
    }, 1000);
  };

  const handleSubmit = () => {
    setLoading(true);
    // 답변 제출 API 호출 (예시)
    setTimeout(() => {
      console.log('답변 제출:', answer);
      setLoading(false);
      window.location.reload(); // 현재 페이지 새로 고침
    }, 1000);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: '95%', p: 4 }}>
        <CardContent>
          <Typography variant="h2" component="div" textAlign="center" gutterBottom>
            Admin Q&A
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>

            {/* 질문 제목 및 작성자 */}
            <Typography variant="h6">질문 No.: {qna.qno}</Typography>
            <Typography variant="h6">질문 제목: {qna.title}</Typography>
            <Typography variant="body1">작성자: {qna.writer}</Typography>
            {/* 질문 내용 */}
            <Typography variant="body2" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
              {qna.question}
            </Typography>
            <Box sx={{ mt: 2 }} /> {/* 여기서 여백을 추가합니다. */}
            <Typography variant="h3" component="div" textAlign="left" gutterBottom>
              Answer Here!
            </Typography>
            {/* 관리자의 답변 입력란 */}
            <TextField
              fullWidth
              label="관리자 답변"
              value={answer}
              onChange={handleAnswerChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
            />
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="outlined" onClick={handleCancel} disabled={loading} sx={{ mr: 1 }} >
                취소
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                답변 제출
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 로딩 스피너 */}
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(255, 255, 255, 0.7)" // 배경 색상 조정 가능
          zIndex={999}
        >
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
}



export default QnaReadComponent;
