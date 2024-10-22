
import { Box, Card, CardContent, Typography, TextField, Button, CircularProgress, FormControl, SelectChangeEvent } from '@mui/material';
import { IQuestion } from '../../types/question';
import { useState } from 'react';
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
};

function QnaReadComponent() {
  const [qna, setQna] = useState<IQuestion>({ ...initState });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams(); // URL의 query 파라미터를 관리하는 훅



  // popstate 이벤트를 감지하여 뒤로 가기 이벤트 처리
  const handlePopState = (event: PopStateEvent) => {
    console.log('popstate event detected', event.state); // 이벤트 발생 여부 확인용 로그

    // 이전 상태로 돌아갈 때 리스트 페이지로 이동
    if (event.state?.page) {
      navigate(`/product/list?page=${query.get('page') || 1}&size=${query.get('size') || 10}`, { replace: true });
    }
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
            Add New FAQ
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <FormControl fullWidth margin="normal">

            </FormControl>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={qna.title}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Content"
              name="content"
              margin="normal"
              variant="outlined"
              multiline
              rows={6}
            />
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mr: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}



export default QnaReadComponent;
