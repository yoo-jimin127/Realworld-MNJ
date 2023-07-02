import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';
import ArticleForm from '../components/profile/ArticleForm';
import { getFavoritedArticles, getMyArticles } from '../apis';
import { ArticleListProps } from '../apis/types';

function Profile() {
  const userInfo = useRecoilValue(userState);
  const location = useLocation();
  const [active, setActive] = useState('my');
  const articlesCountRef = useRef<number>(0);
  const articlesRef = useRef<ArticleListProps[]>([]);

  const fetchArticles = async (username: string) => {
    let data;
    if (active === 'my') {
      data = await getMyArticles(username);
    } else {
      data = await getFavoritedArticles(username);
    }
    articlesRef.current = data.articles;
    articlesCountRef.current = data.articlesCount;
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes('favorites')) {
      setActive('favorites');
    } else {
      setActive('my');
    }
  }, [location]);

  useEffect(() => {
    fetchArticles(userInfo.username);
  }, []);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" alt="user-img" />
              <h4>{userInfo.username}</h4>
              <p>{userInfo.bio}</p>
              <Link
                to="/settings"
                className="btn btn-sm btn-outline-secondary action-btn"
                type="button"
              >
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
                  <Link
                    to={`/@${userInfo.username}`}
                    className={`nav-link ${active === 'my' ? 'active' : ''}`}
                  >
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/@${userInfo.username}/favorites`}
                    className={`nav-link ${active === 'favorites' ? 'active' : ''}`}
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>
            {articlesCountRef.current
              ? articlesRef.current.map((article) => <ArticleForm />)
              : // TODO : css 수정
                'No articles are here... yet.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
