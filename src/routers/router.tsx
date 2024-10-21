import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';




const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );


//QnA
const QnAList = Loader(
  lazy(() => import('src/qna/components/list'))
);


// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);



const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },

  //Q&A
  {
    path: '/qna',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <QnAList />
      }
    ]
  }
];

export default routes;