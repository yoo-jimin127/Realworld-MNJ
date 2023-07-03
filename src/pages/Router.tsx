import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Settings from './Settings';
import EditArticle, { updateArticleLoader } from './EditArticle';
import CreateArticle from './CreateArticle';
import Article, { articleLoader } from './Article';
import Profile, { favoritedArticlesLoader, myArticlesLoader } from './Profile';
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
        loader: updateArticleLoader,
      },
      {
        path: '/article/:articleSlug',
        element: <Article />,
        loader: articleLoader,
      },
      {
        path: '/:username',
        element: <Profile />,
        loader: myArticlesLoader,
      },
      {
        path: '/:username/favorites',
        element: <Profile />,
        loader: favoritedArticlesLoader,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
