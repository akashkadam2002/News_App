import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      props.setProgress(40);
      let parseData = await data.json();
      props.setProgress(70);
      setArticles(parseData.articles)
      settotalResults(parseData.totalResults)
      setLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
    props.setProgress(100);

  }

  useEffect(() => {
    document.title = `${capitalFirstLetter(props.category)} - DailyNews`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    try {
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles(articles.concat(parseData.articles))
      settotalResults(parseData.totalResults)

    } catch (error) {
      console.error('Error fetching more data:', error);
      setLoading(false);
    }
  }
  return (
    <div className='container my-3'>
      <h1 className='text-center' style={{ margin: '90px' }}>DailyNews - Top {capitalFirstLetter(props.category)} Headlines</h1>

      {loading && <Loading />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Loading />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>

      </InfiniteScroll>

    </div>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;

