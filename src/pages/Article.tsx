import { Link, LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import {
  createComment,
  deleteArticle,
  deleteComment,
  favoriteArticle,
  followUser,
  getArticle,
  getComments,
  unfavoriteArticle,
  unfollowUser,
} from '../apis';
import { userState } from '../atoms';
import CommentCard from '../components/comment/CommentCard';
import { ArticleListProps, Comment } from '../apis/types';

export const articleLoader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.articleSlug!;
  const [articleData, commentsData] = await Promise.all([getArticle(slug), getComments(slug)]);
  return { articleData, commentsData };
};

function Article() {
  const navigate = useNavigate();
  const {
    articleData: { article },
    commentsData: { comments },
  } = useLoaderData() as {
    articleData: { article: ArticleListProps };
    commentsData: { comments: Comment[] };
  };
  const userInfo = useRecoilValue(userState);
  const [favorited, setFavorited] = useState(article.favorited);
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);
  const [isFollowing, setIsFollowing] = useState(article.author.following);
  const [commentsData, setCommentsData] = useState(comments);
  const [commentText, setCommentText] = useState('');

  const isSelf = article.author.username === userInfo.username;

  const handleDelete = (slug: string) => {
    deleteArticle(slug);
    navigate('/');
  };

  const handleClickFollow = async (name: string) => {
    const profileData = await followUser(name);
    setIsFollowing(profileData.profile.following);
  };

  const handleClickUnfollow = async (name: string) => {
    const profileData = await unfollowUser(name);
    setIsFollowing(profileData.profile.following);
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

  const handleSubmitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    const commentData = await createComment(article.slug, commentText);
    setCommentsData([commentData.comment, ...commentsData]);
    setCommentText('');
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(article.slug, id);
    setCommentsData(commentsData.filter((comment) => comment.id !== id));
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <Link to={`/@${article.author.username}`}>
              <img src="http://i.imgur.com/Qr71crq.jpg" alt="" />
            </Link>
            <div className="info">
              <Link to={`/@${article.author.username}`} className="author">
                {article.author.username}
              </Link>
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
                <button
                  onClick={
                    isFollowing
                      ? () => handleClickUnfollow(article.author.username)
                      : () => handleClickFollow(article.author.username)
                  }
                  className={(isFollowing ? 'btn-secondary' : 'btn-outline-secondary').concat(
                    ' ',
                    'btn btn-sm',
                  )}
                  type="button"
                >
                  <i className="ion-plus-round" />
                  &nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {article.author.username}{' '}
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={
                    favorited
                      ? () => handleClickUnfavorite(article.slug)
                      : () => handleClickFavorite(article.slug)
                  }
                  className={(favorited ? 'btn-primary' : 'btn-outline-primary').concat(
                    ' ',
                    'btn btn-sm',
                  )}
                  type="button"
                >
                  <i className="ion-heart" />
                  &nbsp; {favorited ? 'Unfavorite' : 'Favorite'} Article{' '}
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
                <li key={tag} className="tag-default tag-pill tag-outline ng-binding ng-scope">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link to={`/${article.author.username}`}>
              <img src="http://i.imgur.com/Qr71crq.jpg" alt="" />
            </Link>
            <div className="info">
              <Link to={`/${article.author.username}`} className="author">
                {article.author.username}
              </Link>
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
                <button
                  onClick={
                    isFollowing
                      ? () => handleClickUnfollow(article.author.username)
                      : () => handleClickFollow(article.author.username)
                  }
                  className={(isFollowing ? 'btn-secondary' : 'btn-outline-secondary').concat(
                    ' ',
                    'btn btn-sm',
                  )}
                  type="button"
                >
                  <i className="ion-plus-round" />
                  &nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {article.author.username}{' '}
                </button>
                &nbsp;
                <button
                  onClick={
                    favorited
                      ? () => handleClickUnfavorite(article.slug)
                      : () => handleClickFavorite(article.slug)
                  }
                  className={(favorited ? 'btn-primary' : 'btn-outline-primary').concat(
                    ' ',
                    'btn btn-sm',
                  )}
                  type="button"
                >
                  <i className="ion-heart" />
                  &nbsp; {favorited ? 'Unfavorite' : 'Favorite'} Article{' '}
                  <span className="counter">({article.favoritesCount})</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form" onSubmit={handleSubmitComment}>
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />
              </div>
              <div className="card-footer">
                <img alt="" src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button type="submit" className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>
            {commentsData.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
