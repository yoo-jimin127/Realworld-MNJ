import { Link, NavLink, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { userState } from '../atoms';
import ArticleForm from '../components/profile/ArticlePreview';
import { followUser, getFavoritedArticles, getMyArticles, getProfile, unfollowUser } from '../apis';
import { ArticleListProps } from '../apis/types';

export const myArticlesLoader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username!.slice(1);
  const [profileData, articleData] = await Promise.all([
    getProfile(username),
    getMyArticles(username),
  ]);
  console.log(profileData);
  return { profileData, articleData };
};

export const favoritedArticlesLoader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username!.slice(1);
  const [profileData, articleData] = await Promise.all([
    getProfile(username),
    getFavoritedArticles(username),
  ]);
  return { profileData, articleData };
};

function Profile() {
  const userInfo = useRecoilValue(userState);
  const {
    profileData: { profile },
    articleData,
  } = useLoaderData();
  const [isFollowing, setIsFollowing] = useState(profile.following);
  const isSelf = userInfo.username === profile.username;

  const handleClickFollow = async (name: string) => {
    const profileData = await followUser(name);
    setIsFollowing(profileData.profile.following);
  };

  const handleClickUnfollow = async (name: string) => {
    const profileData = await unfollowUser(name);
    setIsFollowing(profileData.profile.following);
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" alt="user-img" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              {isSelf ? (
                <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a" />
                  &nbsp; Edit Profile Settings
                </Link>
              ) : (
                <button
                  onClick={
                    isFollowing
                      ? () => handleClickUnfollow(profile.username)
                      : () => handleClickFollow(profile.username)
                  }
                  className="btn btn-sm btn-outline-secondary action-btn"
                  type="button"
                >
                  <i className="ion-plus-round" />
                  &nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {profile.username}
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
                    to={`/@${profile.username}`}
                    className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
                    end
                  >
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/@${profile.username}/favorites`}
                    className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
                    end
                  >
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>
            {articleData.articles.length > 0
              ? articleData.articles.map((article: ArticleListProps) => (
                  <ArticleForm key={article.slug} article={article} />
                ))
              : // TODO : css 수정
                'No articles are here... yet.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
