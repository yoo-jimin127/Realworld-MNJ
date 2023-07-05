import { useEffect, useState } from 'react';
import { getFeedArticle, getGlobalArticle } from '../apis';
import ArticlePreview from '../components/profile/ArticlePreview';
import { ArticleListProps } from '../apis/types';

function Home() {
  const [isYourTab, setIsYourTab] = useState(true);
  const [articles, setArticles] = useState([]);

  const fetchFeedArticle = async () => {
    const articleData = await getFeedArticle();
    setArticles(articleData.articles);
  };

  const handleClickTab = async () => {
    setIsYourTab(!isYourTab);
    const articleData = isYourTab ? await getFeedArticle() : await getGlobalArticle();
    setArticles(articleData.articles);
  };

  useEffect(() => {
    fetchFeedArticle();
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    type="button"
                    className={isYourTab ? 'nav-link active' : 'nav-link disabled'}
                    onClick={() => handleClickTab()}
                  >
                    Your Feed
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={isYourTab ? 'nav-link disabled' : 'nav-link active'}
                    onClick={() => handleClickTab()}
                  >
                    Global Feed
                  </button>
                </li>
              </ul>
            </div>
            {articles.map((article: ArticleListProps) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">
                  programming
                </a>
                <a href="" className="tag-pill tag-default">
                  javascript
                </a>
                <a href="" className="tag-pill tag-default">
                  emberjs
                </a>
                <a href="" className="tag-pill tag-default">
                  angularjs
                </a>
                <a href="" className="tag-pill tag-default">
                  react
                </a>
                <a href="" className="tag-pill tag-default">
                  mean
                </a>
                <a href="" className="tag-pill tag-default">
                  node
                </a>
                <a href="" className="tag-pill tag-default">
                  rails
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
