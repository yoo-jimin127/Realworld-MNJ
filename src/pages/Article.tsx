import { Link, LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { deleteArticle, favoriteArticle, getArticle, unfavoriteArticle } from '../apis';
import { ArticleListProps } from '../apis/types';
import { userState } from '../atoms';

export const articleLoader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.articleSlug!;
  const { article } = await getArticle(slug);
  return article;
};

function Article() {
  const navigate = useNavigate();
  const article = useLoaderData() as ArticleListProps;
  const userInfo = useRecoilValue(userState);
  const [favorited, setFavorited] = useState(article.favorited);
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);
  const isSelf = article.author.username === userInfo.username;

  const handleDelete = (slug: string) => {
    deleteArticle(slug);
    navigate('/');
  };

  const handleClickFavorite = async (slug: string) => {
    const articleData = await favoriteArticle(slug);
    setFavorited(articleData.article.favorited);
    setFavoriteCount(articleData.article.favoritesCount);
  };

  const handleClickUnfavorite = async (slug: string) => {
    const articleData = await unfavoriteArticle(slug);
    setFavorited(articleData.article.favorited);
    setFavoriteCount(articleData.article.favoritesCount);
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <a href="/">
              <img src="http://i.imgur.com/Qr71crq.jpg" alt="" />
            </a>
            <div className="info">
              <a href="/" className="author">
                {article.author.username}
              </a>
              {/* TODO: 날짜 포맷팅 */}
              <span className="date">{article.createdAt}</span>
            </div>
            {isSelf ? (
              <>
                <Link className="btn btn-sm btn-outline-secondary" to={`/editor/${article.slug}`}>
                  <i className="ion-edit" />
                  &nbsp; Edit Article
                </Link>
                &nbsp;&nbsp;
                <button
                  className="btn btn-sm btn-outline-danger"
                  type="button"
                  onClick={() => handleDelete(article.slug)}
                >
                  <i className="ion-trash-a" />
                  &nbsp; Delete Article
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-sm btn-outline-secondary" type="button">
                  <i className="ion-plus-round" />
                  &nbsp; Follow {article.author.username}{' '}
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={
                    favorited
                      ? () => handleClickUnfavorite(article.slug)
                      : () => handleClickFavorite(article.slug)
                  }
                  className="btn btn-sm btn-outline-primary"
                  type="button"
                >
                  <i className="ion-heart" />
                  &nbsp; {favorited ? 'Unfavorite' : 'Favorite'} Post{' '}
                  <span className="counter">({favoriteCount})</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline ng-binding ng-scope">{tag}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html">
              <img src="http://i.imgur.com/Qr71crq.jpg" alt="" />
            </a>
            <div className="info">
              <a href="/" className="author">
                {article.author.username}
              </a>
              <span className="date">{article.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary" type="button">
              <i className="ion-plus-round" />
              &nbsp; Follow {article.author.username}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary" type="button">
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." />
              </div>
              <div className="card-footer">
                <img alt="" src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button type="button" className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <div className="card-footer">
                <a href="/" className="comment-author">
                  <img alt="" src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit" />
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
