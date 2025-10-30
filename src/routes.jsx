import App from './App';
import { createBrowserRouter, redirect } from 'react-router';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { getUserInfo } from './api/api';

export let router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'auth',
        Component: AuthPage,
        loader: async () => {
          const data = await getUserInfo();
          if (data?.email) throw redirect('/home');
          return null;
        },
        children: [
          { path: 'login', Component: LoginForm },
          { path: 'register', Component: RegisterForm },
        ],
      },
      {
        path: 'home',
        Component: HomePage,
        loader: async () => {
          const data = await getUserInfo();
          if (!data?.email) throw redirect('/auth');
          return null;
        },
      },
    ],
  },
]);

export const ROUTES = {
  AUTH_URL: '/auth',
  HOME_URL: '/home',
};
