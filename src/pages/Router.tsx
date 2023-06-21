import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Settings from './Settings';
import EditArticle from './EditArticle';
import CreateArticle from './CreateArticle';
import Article from './Article';
import Profile from './Profile';
import HomeLayout from '../components/layout/HomeLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/editor',
        element: <CreateArticle />,
      },
      {
        path: '/editor/:articleSlug',
        element: <EditArticle />,
      },
      {
        path: '/article/:articleSlug',
        element: <Article />,
      },
      {
        path: '/profile/:username',
        element: <Profile />,
      },
      {
        path: '/profile/:username/favorites',
        element: <Profile />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
