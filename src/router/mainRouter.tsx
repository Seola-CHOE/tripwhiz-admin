import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';

import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import qnaRouter from './qnaRouter';
import faqRouter from './faqRouter';




const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );




// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);



const mainRouter: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '*',
        element: <Status404 />
      },
      qnaRouter,
      faqRouter
    ]
  }
];





export default mainRouter