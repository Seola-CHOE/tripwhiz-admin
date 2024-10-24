import { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import SidebarLayout from '../layouts/SidebarLayout';
import { Navigate } from 'react-router-dom';
import FaqListPage from '../faq/pages/FaqListPage';
import FaqModifyPage from '../faq/pages/FaqModifyPage';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );


const FaQList = Loader(
  lazy(() => import('src/faq/components/list'))
);

const FaQAdd = Loader(
  lazy(() => import('src/faq/pages/FaqAddPage'))
);

const FaQModi = Loader(
  lazy(() => import('src/faq/pages/FaqModifyPage'))
);


const faqRouter = {

    path: '/faq',
    element: <SidebarLayout />,
    children: [
    {
        path: '',
        element: <Navigate to="list" replace />
    },
    {
        path: 'list',
        element: <FaqListPage/>
    },
    {
        path: 'add',
        element: <FaQAdd/>
    },
    {
        path: 'modify',
        element: <FaqModifyPage/>
    }
  ]
}

export default faqRouter