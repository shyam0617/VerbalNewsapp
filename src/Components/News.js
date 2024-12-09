import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
//import VoiceIntegration from './VoiceIntegration';
import VoiceIntegration from './nlpvoice';
import { useNavigate } from 'react-router-dom';

const News = ({ category, pageSize, country, mode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    //https://newsapi.org/v2/top-headlines?country=US&category=${category}&language=en&apiKey=190894644a72409c89e25c889323769e&page=${page}&pageSize=${pageSize}

    const url = `https://newsapi.org/v2/top-headlines?country=US&category=${category}&language=en&apiKey=190894644a72409c89e25c889323769e&page=${page}&pageSize=${pageSize}
`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles || []);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [category, page]);

  const handlePageChange = (direction) => {
    if (direction === 'next' && page < Math.ceil(totalResults / pageSize)) {
      setPage(page + 1);
    } else if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>{`Top ${category.charAt(0).toUpperCase() + category.slice(1)} Headlines`}</h1>
      {loading && <Spinner />}
      {!loading && articles.length > 0 ? (
        <div>
          <div className="row">
            {articles.map((article) => (
              <div key={article.url} className="col-md-4">
                <NewsItems
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                  mode={mode}
                />
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={page <= 1}
              className="pagination-button"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange('next')}
              disabled={page >= Math.ceil(totalResults / pageSize)}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        !loading && <p>No articles available at the moment.</p>
      )}

      <VoiceIntegration
        articles={articles}
        onNavigate={(section) => navigate(`/${section}`)}
        mode={mode}
      />
    </div>
  );
};

export default News;
