import App from './App';
import { createBrowserRouter, redirect } from 'react-router';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { getUserInfo } from './api/api';

export const ROUTES = {
  ROOT: '/',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  HOME: '/home',
};

export let router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    Component: App,
    children: [
      {
        index: true,
        loader: async () => {
          const data = await getUserInfo();
          if (data?.email) return redirect(ROUTES.HOME);
          return redirect(ROUTES.LOGIN);
        },
      },
      {
        path: ROUTES.AUTH,
        Component: AuthPage,
        loader: async () => {
          const data = await getUserInfo();
          if (data?.email) return redirect(ROUTES.HOME);
          return null;
        },
        children: [
          { index: true, loader: () => redirect(ROUTES.LOGIN) },
          { path: 'login', Component: LoginForm },
          { path: 'register', Component: RegisterForm },
        ],
      },
      {
        path: ROUTES.HOME,
        Component: HomePage,
        loader: async () => {
          const data = await getUserInfo();
          if (!data?.email) return redirect(ROUTES.AUTH);
          return null;
        },
      },
    ],
  },
]);
