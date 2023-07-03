import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getArticle } from '../apis';
import { ArticleListProps } from '../apis/types';

export const articleLoader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.articleSlug!;
  const { article } = await getArticle(slug);
  return article;
};

function Article() {
  const article = useLoaderData() as ArticleListProps;
  console.log(article);

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
              <span className="date">January 20th</span>
            </div>
            <Link className="btn btn-sm btn-outline-secondary" to={`/editor/${article.slug}`}>
              <i className="ion-edit" />
              &nbsp; Edit Article
            </Link>
            &nbsp;&nbsp;
            <Link className="btn btn-sm btn-outline-danger" to={`/editor/${article.slug}`}>
              <i className="ion-trash-a" />
              &nbsp; Delete Article
            </Link>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
            {/* TODO : 무슨 내용 들어가야 하는지 조사 */}
            <h2 id="introducing-ionic">{article.description}</h2>
            <p>{article.body}</p>
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

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html">
              <img alt="" src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href="/" className="author">
                Eric Simons
              </a>
              <span className="date">January 20th</span>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button type="button" className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">(29)</span>
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
                <button type="button" className="btn btn-sm btn-primary">Post Comment</button>
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
              </div>
            </div>

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
