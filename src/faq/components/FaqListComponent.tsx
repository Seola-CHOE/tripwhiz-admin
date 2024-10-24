import React, { useEffect, useState, useCallback } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardHeader,
  Divider,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IFaq, ICategory } from '../../types/faq';
import { getFaqList } from '../../api/faqAPI';

const FaqListComponent = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filterCategory, setFilterCategory] = useState<number>(0); // 전체를 위한 초기값 0 설정
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const faqData = await getFaqList();
      setFaqs(faqData);

      // FAQ 데이터에서 고유한 카테고리 목록을 추출
      const uniqueCategories = Array.from(
        new Map(
          faqData
            .filter((faq) => faq.category) // 카테고리가 있는 FAQ만 필터링
            .map((faq) => [faq.category.cno, faq.category]) // cno를 키로 하는 Map 생성
        ).values()
      );

      // "전체" 카테고리를 목록의 첫 번째로 추가
      setCategories([{ cno: 0, cname: '전체' }, ...uniqueCategories]);
      setError(null);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
      setError('데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategoryChange = (cno: number) => {
    setFilterCategory(cno);
  };

  const filteredFaqs = filterCategory === 0
    ? faqs
    : faqs.filter((faq) => faq.category.cno === filterCategory);

  const limitedFaqs = filteredFaqs.slice(0, 5); // 상위 5개 FAQ만 표시

  return (
    <Box>
      {/* 카테고리 메뉴 */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: '20px' }}
      >
        {categories.length > 0 &&
          categories.map((category, index) => (
            <React.Fragment key={category.cno}>
              <Typography
                onClick={() => handleCategoryChange(category.cno)}
                style={{
                  cursor: 'pointer',
                  margin: '0 10px',
                  color: filterCategory === category.cno ? '#000' : '#888',
                }}
              >
                {category.cname}
              </Typography>
              {index < categories.length - 1 && (
                <Typography style={{ margin: '0 10px', color: '#888' }}>|</Typography>
              )}
            </React.Fragment>
          ))}
      </Box>

      <Typography variant="h2" align="center" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
        FAQ TOP 5
      </Typography>

      {error && (
        <Typography color="error" align="center" variant="body1" style={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}

      {limitedFaqs.length > 0 ? (
        limitedFaqs.map((faq) => (
          <Card key={faq.fno} style={{ marginBottom: '16px' }}>
            <Box style={{ backgroundColor: '#FCFBF0' }}>
              <CardHeader title={`Q: ${faq.question}`} />
            </Box>
            <Divider />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${faq.fno}`}
                id={`faq-header-${faq.fno}`}
              >
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Question Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                  A: {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Card>
        ))
      ) : (
        <Typography align="center" style={{ marginTop: '20px' }}>
          No FAQs available.
        </Typography>
      )}
    </Box>
  );
};

export default FaqListComponent;
