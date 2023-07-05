import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getFeedArticle, getGlobalArticle, getTags } from '../apis';
import ArticlePreview from '../components/profile/ArticlePreview';
import { ArticleListProps } from '../apis/types';
import { loginState } from '../atoms';

function Home() {
  const [isYourTab, setIsYourTab] = useState(true);
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const logined = useRecoilValue(loginState);

  const fetchFeedArticle = async () => {
    const articleData = logined ? await getFeedArticle() : await getGlobalArticle();
    setArticles(articleData.articles);
  };

  const handleClickTab = async () => {
    setIsYourTab(!isYourTab);
    const articleData = isYourTab ? await getFeedArticle() : await getGlobalArticle();
    setArticles(articleData.articles);
  };

  const fetchTags = async () => {
    const tagData = await getTags();
    setTags(tagData.tags);
  };

  useEffect(() => {
    fetchFeedArticle();
    fetchTags();
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
                {logined ? (
                  <>
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
                  </>
                ) : (
                  <li className="nav-item">
                    <button
                      type="button"
                      className='nav-link active'
                      onClick={() => handleClickTab()}
                    >
                      Global Feed
                    </button>
                  </li>
                )}
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
                {tags.map((tag) => (
                  <a href="/" className="tag-pill tag-default">
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
