import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getFeedArticle, getGlobalArticle, getTags } from '../apis';
import ArticlePreview from '../components/profile/ArticlePreview';
import { ArticleListProps, HomeActiveTab } from '../apis/types';
import { loginState } from '../atoms';

function Home() {
  const loggedIn = useRecoilValue(loginState);
  const [activeTab, setActiveTab] = useState<HomeActiveTab>('global');
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchUserFeedArticle = async () => {
    const articleData = await getFeedArticle();
    setArticles(articleData.articles);
  };

  const fetchGlobalFeedArticle = async () => {
    const articleData = await getGlobalArticle();
    setArticles(articleData.articles);
  };

  const fetchTags = async () => {
    const tagData = await getTags();
    setTags(tagData.tags);
  };

  useEffect(() => {
    if (loggedIn) {
      setActiveTab('your');
      fetchUserFeedArticle();
    } else {
      setActiveTab('global');
      fetchGlobalFeedArticle();
    }
    fetchTags();
  }, [loggedIn]);

  const handleClickYourFeed = () => {
    setActiveTab('your');
    fetchUserFeedArticle();
  };

  const handleClickGlobalFeed = () => {
    setActiveTab('global');
    fetchGlobalFeedArticle();
  };

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
                {loggedIn && (
                  <li className="nav-item">
                    <button
                      type="button"
                      className={activeTab === 'your' ? 'nav-link active' : 'nav-link'}
                      onClick={() => handleClickYourFeed()}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    type="button"
                    className={activeTab === 'global' ? 'nav-link active' : 'nav-link'}
                    onClick={() => handleClickGlobalFeed()}
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
                {tags.map((tag) => (
                  <a key={tag} href="/" className="tag-pill tag-default">
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
