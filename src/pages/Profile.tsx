import { Link, NavLink, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';
import ArticleForm from '../components/profile/ArticleForm';
import { getFavoritedArticles, getMyArticles } from '../apis';
import { ArticleResponse } from '../apis/types';

export const myArticlesLoader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username!.slice(1);
  const data = await getMyArticles(username);
  return data;
};

export const favoritedArticlesLoader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username!.slice(1);
  const data = await getFavoritedArticles(username);
  return data;
};

function Profile() {
  const userInfo = useRecoilValue(userState);
  const { articles } = useLoaderData() as ArticleResponse;
  console.log('articles', articles);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" alt="user-img" />
              <h4>{userInfo.username}</h4>
              <p>{userInfo.bio}</p>
              <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-gear-a" />
                &nbsp; Edit Profile Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/@${userInfo.username}`}
                    className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
                    end
                  >
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/@${userInfo.username}/favorites`}
                    className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
                    end
                  >
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>
            {articles.length > 0
              ? articles.map((article) => <ArticleForm />)
              : // TODO : css 수정
                'No articles are here... yet.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
