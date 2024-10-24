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
import { IFaq } from '../../types/faq';
import { getFaqList } from '../../api/faqAPI';

const FaqListComponent = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const faqData = await getFaqList();
      setFaqs(faqData);
      setError(null);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
      setError('데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const limitedFaqs = faqs.slice(0, 5); // 상위 5개 FAQ만 표시

  return (
    <Box>
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
              <CardHeader
                title={`Q: ${faq.question}`}
                subheader={`Category: ${faq.category?.cname || 'No category'}`}
              />
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
