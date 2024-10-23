import QnaListComponent from '../components/QnaListComponent';
import PageHeader from '../components/list/PageHeader';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from '../../components/Footer';


function QnaListPage() {


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
            <QnaListComponent/>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default QnaListPage;