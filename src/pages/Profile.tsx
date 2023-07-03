import { Link, NavLink, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { userState } from '../atoms';
import ArticleForm from '../components/profile/ArticleForm';
import { followUser, getFavoritedArticles, getMyArticles, unfollowUser } from '../apis';
import { ArticleListProps, ArticleResponse } from '../apis/types';

export const myArticlesLoader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username!.slice(1);
  const data = await getMyArticles(username);
  return { data, username };
};

export const favoritedArticlesLoader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username!.slice(1);
  const data = await getFavoritedArticles(username);
  return { data, username };
};

function Profile() {
  const userInfo = useRecoilValue(userState);
  const { data, username } = useLoaderData();
  const isSelf = userInfo.username === username;
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClickFollow = async (name: string) => {
    const profile = await followUser(name);
    setIsFollowing(true);
  };

  const handleClickUnfollow = async (name: string) => {
    const profile = await unfollowUser(name);
    setIsFollowing(false);
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" alt="user-img" />
              <h4>{userInfo.username}</h4>
              <p>{userInfo.bio}</p>
              {isSelf ? (
                <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a" />
                  &nbsp; Edit Profile Settings
                </Link>
              ) : (
                <button
                  onClick={isFollowing? (() => handleClickUnfollow(username)) : (() => handleClickFollow(username))}
                  className="btn btn-sm btn-outline-secondary action-btn"
                  type="button"
                >
                  <i className="ion-plus-round" />
                  &nbsp; {isFollowing? 'Unfollow' : 'Follow'} {username}
                </button>
              )}
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
            {data.articles.length > 0
              ? data.articles.map((article: ArticleListProps) => <ArticleForm />)
              : // TODO : css 수정
                'No articles are here... yet.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
