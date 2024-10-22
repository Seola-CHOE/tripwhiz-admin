import { useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, CircularProgress } from '@mui/material';

interface IFaq {
  fno?: number;
  title: string;
  content: string;
  createdDate: string;
}

const initState: IFaq = {
  fno: undefined,
  title: '',
  content: '',
  createdDate: '',
};

function FaqModifyComponent() {
  const [faq, setFaq] = useState<IFaq>({ ...initState });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFaq((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleClick = () => {
    setLoading(true);
    postFaq(faq)
      .then((newFaq: IFaq) => {
        console.log(newFaq);
        setFaq({ ...initState });
        navigate('/faq/list');
      })
      .catch((error) => {
        console.error("Failed to modify FAQ:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate('/faq/list');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: '60%', p: 4 }}>
        <CardContent>
          <Typography variant="h2" component="div" textAlign="center" gutterBottom>
            Modify FAQ
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={faq.title}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={faq.content}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={6}
            />
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={loading}
                sx={{ mr: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
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

// 예시용 API 호출 함수
async function postFaq(faq: IFaq): Promise<IFaq> {
  // 서버와의 통신 로직을 여기에 작성하세요.
  // 예시로 성공적으로 수정된 FAQ 객체를 반환합니다.
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...faq, fno: Date.now() }), 1000);
  });
}

export default FaqModifyComponent;
