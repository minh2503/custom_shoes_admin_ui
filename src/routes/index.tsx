import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const AdvisoryPage = lazy(() => import('@/pages/advisory'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);
const CheckInPage = lazy(() => import('@/pages/checkin'));
const CheckInManagerPage = lazy(() => import('@/pages/checkin-manager'));
const RevenuePage = lazy(() => import('@/pages/revenue'));
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
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'student/:id/',
          element: <StudentDetailPage />
        },
        {
          path: 'form',
          element: <FormPage />
        },
        {
          path: 'advisory',
          element: <AdvisoryPage />
        },
        {
          path: 'checkin-student',
          element: <CheckInPage />
        },
        {
          path: 'checkin-manager',
          element: <CheckInManagerPage />
        },
        {
          path: 'revenue',
          element: <RevenuePage />
        }
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
