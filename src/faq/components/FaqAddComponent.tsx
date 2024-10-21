import { useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, CircularProgress, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';

interface IFaq {
  fno?: number;
  title: string;
  category: string;
  content: string;
  createdDate: string;
}

const initState: IFaq = {
  fno: undefined,
  title: '',
  category: '',
  content: '',
  createdDate: '',
};

// 예시 카테고리 목록
const categories = [
  'General',
  'Technical',
  'Billing',
  'Other'
];

function FaqAddComponent() {
  const [faq, setFaq] = useState<IFaq>({ ...initState });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFaq((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setFaq((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleClick = () => {
    setLoading(true);
    postFaq(faq)
      .then((newFaq: IFaq) => {
        console.log(newFaq);
        setFaq({ ...initState });
        navigate('/faq/list');
      })
      .catch((error) => {
        console.error("Failed to add FAQ:", error);
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
            Add New FAQ
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={faq.category}
                onChange={handleCategoryChange}
                variant="outlined"
                label="Category"
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
  // 예시로 성공적으로 추가된 FAQ 객체를 반환합니다.
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...faq, fno: Date.now() }), 1000);
  });
}

export default FaqAddComponent;
