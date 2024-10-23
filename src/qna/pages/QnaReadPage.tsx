import QnaReadComponent from '../components/QnaReadComponent';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import PageHeader from '../components/list/PageHeader';
import { Container, Grid } from '@mui/material';
import Footer from '../../components/Footer';

function QnaReadPage() {

  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <QnaReadComponent/>
          </Grid>
        </Grid>
      </Container>

      <Footer />

    </>
  );
}

export default QnaReadPage;