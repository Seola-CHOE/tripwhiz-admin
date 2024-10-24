import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { IFaq, ICategory } from '../../types/faq';
import { getFaqList } from '../../api/faqAPI';

const FaqListComponent = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('전체');
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // FAQ 데이터 가져오기
      const faqData = await getFaqList();
      setFaqs(faqData);

      // 고유한 카테고리 목록 추출
      const uniqueCategories = Array.from(
        new Map(faqData.map((faq) => [faq.category.cno, faq.category])).values()
      );
      setCategories(uniqueCategories);
      setError(null); // 성공 시 에러 상태 초기화
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 카테고리 필터 옵션 설정
  const categoryOptions = [
    { id: '전체', name: '전체' },
    ...categories.map((category) => ({ id: category.cno.toString(), name: category.cname })),
  ];

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setFilterCategory(e.target.value);
  };

  // FAQ 필터링 함수
  const filteredFaqs = filterCategory === '전체'
    ? faqs
    : faqs.filter((faq) => faq.category.cno.toString() === filterCategory);

  // 렌더링 함수: FAQ 테이블
  const renderTableRows = () => {
    if (filteredFaqs.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            No FAQs available.
          </TableCell>
        </TableRow>
      );
    }

    return filteredFaqs.map((faq) => (
      <TableRow hover key={faq.fno}>
        <TableCell align="center">{faq.fno}</TableCell>
        <TableCell align="left">{faq.question}</TableCell>
        <TableCell align="left">{faq.answer}</TableCell>
        <TableCell align="center">{faq.del_flag ? 'Yes' : 'No'}</TableCell>
        <TableCell align="center">{faq.view_cnt}</TableCell>
        <TableCell align="center">
          {faq.category?.cname || 'Unknown'}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="FAQ List"
      />

      <Divider />

      {error && (
        <Typography color="error" align="center" variant="body1" style={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}

      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: '#FCFBF0' }}>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Question</TableCell>
              <TableCell align="center">Answer</TableCell>
              <TableCell align="center">Deleted</TableCell>
              <TableCell align="center">View Count</TableCell>
              <TableCell align="center">Category</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default FaqListComponent;
