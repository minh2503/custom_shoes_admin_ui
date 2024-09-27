import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const RevenuePage = lazy(() => import('@/pages/revenue'));
const OrderPage = lazy(() => import('@/pages/Order'));
// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'order',
          element: <OrderPage />
        },
        {
          path: 'revenue',
          element: <RevenuePage />
        }
        // {
        //   path: 'student',
        //   element: <StudentPage />
        // },
        // {
        //   path: 'student/:id/',
        //   element: <StudentDetailPage />
        // },
        // {
        //   path: 'form',
        //   element: <FormPage />
        // },
        // {
        //   path: 'advisory',
        //   element: <AdvisoryPage />
        // },
        // {
        //   path: 'checkin-student',
        //   element: <CheckInPage />
        // },
        // {
        //   path: 'checkin-manager',
        //   element: <CheckInManagerPage />
        // },
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
