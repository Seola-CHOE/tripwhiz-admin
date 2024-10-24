import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { IFaq, ICategory } from '../../types/faq';
import { getFaqList } from '../../api/faqAPI';

const FaqListComponent = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('전체');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // FAQ 데이터와 카테고리 데이터를 함께 가져오기
        const faqData = await getFaqList();
        setFaqs(faqData);
        // 카테고리 데이터 추출 및 설정
        const categoryData = Array.from(
          new Set(faqData.map((faq) => faq.category))
        );
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
  const filteredFaqs = faqs.filter((faq) => {
    if (filterCategory === '전체') return true;
    return faq.cno.toString() === filterCategory;
  });

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
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No FAQs available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default FaqListComponent;
