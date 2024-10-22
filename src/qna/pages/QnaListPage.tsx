import QnaListComponent from '../components/QnaListComponent';
import PageHeader from '../components/list/PageHeader';
import PageTitleWrapper from '../../components/PageTitleWrapper';


function QnaListPage() {


  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <QnaListComponent/>
    </>
  );
}

export default QnaListPage;