import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../apis';
import { ArticleListProps } from '../apis/types';

function Article() {
  const [articleContent, setArticleContent] = useState<ArticleListProps>();
  const { articleSlug } = useParams();

  const fetchArticle = async (slug: string) => {
    const { article } = await getArticle(slug);
    setArticleContent(article);
  };

  useEffect(() => {
    fetchArticle(articleSlug as string);
  }, [articleContent]);

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{articleContent?.title}</h1>

          <div className="article-meta">
            <a href="/">
              <img src="http://i.imgur.com/Qr71crq.jpg" alt="" />
            </a>
            <div className="info">
              <a href="/" className="author">
                {articleContent?.author.username}
              </a>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary" type="button">
              <i className="ion-plus-round" />
              &nbsp; Follow {articleContent?.author.username} <span className="counter">({})</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary" type="button">
              <i className="ion-heart" />
              &nbsp; Favorite Article{' '}
              <span className="counter">({articleContent?.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{articleContent?.body}</p>
            {/* TODO : 무슨 내용 들어가야 하는지 조사 */}
            <h2 id="introducing-ionic">{articleContent?.description}</h2>
            <p>{articleContent?.body}</p>
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
                {articleContent?.author.username}
              </a>
              <span className="date">{articleContent?.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary" type="button">
              <i className="ion-plus-round" />
              &nbsp; Follow {articleContent?.author.username}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary" type="button">
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">({articleContent?.favoritesCount})</span>
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
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" alt="" />
                <button className="btn btn-sm btn-primary" type="button">
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
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" alt="" />
                </a>
                &nbsp;
                <a href="/" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
