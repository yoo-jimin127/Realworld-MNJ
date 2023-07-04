import { useEffect } from 'react';
import { ArticleListProps } from '../../apis/types';

function ArticleForm({ article }: {article: ArticleListProps}) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="/">
          <img src="http://i.imgur.com/Qr71crq.jpg" alt="" />
        </a>
        <div className="info">
          <a href="/" className="author">
            {article.author.username}
          </a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button type="button" className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <a href="/" className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
}

export default ArticleForm;
