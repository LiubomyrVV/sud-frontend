import App from './App';
import { createBrowserRouter, redirect } from 'react-router';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { executeOnce } from './utils/utils';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const redirectOnceToAuth = executeOnce(() => {
  throw redirect('auth');
});

export let router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    loader: () => {
      if (!(window.location.pathname === '/')) return null;
      const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
      }, {});

      const userToken = cookies['userToken'];

      if (!userToken) {
        redirectOnceToAuth();
      }

      return null;
    },
    children: [
      {
        path: 'auth',
        Component: AuthPage,
        children: [
          { path: 'login', Component: LoginForm },
          { path: 'register', Component: RegisterForm },
        ],
        // loader exectutes before the route is rendered!
        // loader: ({ request, params }) =>
        //   fetch(`/api/show/${params.showId}.json`, {
        //     signal: request.signal,
        //   }),
      },
      {
        path: 'home',
        Component: HomePage,
      },
    ],
  },
]);

export const ROUTES = {
  AUTH_URL: '/auth',
  HOME_URL: '/home',
};
