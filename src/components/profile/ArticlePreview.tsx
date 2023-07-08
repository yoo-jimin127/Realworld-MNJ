import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ArticleListProps } from '../../apis/types';
import { loginState } from '../../atoms';

function ArticlePreview({
  article,
  onClickFavorite,
  onClickUnfavorite,
}: {
  article: ArticleListProps;
  onClickFavorite: (slug: string) => Promise<void>;
  onClickUnfavorite: (slug: string) => Promise<void>;
}) {
  const loggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();

  const handleClickFavorite = () => {
    if (!loggedIn) {
      navigate('/register');
      return;
    }

    if (article.favorited) {
      onClickUnfavorite(article.slug);
      return;
    }

    onClickFavorite(article.slug);
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src="http://i.imgur.com/Qr71crq.jpg" alt="" />
        </Link>
        <div className="info">
          <Link to={`/@${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{article.createdAt}</span>
        </div>
        <button
          type="button"
          onClick={handleClickFavorite}
          className={(article.favorited ? ' btn-primary' : 'btn-outline-primary').concat(
            ' ',
            'btn btn-sm pull-xs-right',
          )}
        >
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}

export default ArticlePreview;
