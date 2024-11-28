import React from 'react';

const NewsItems = ({ title, description, imageUrl, newsUrl, author, date, source, mode }) => {
  return (
    <div className="my-3">
      <div className={`card bg-${mode === 'dark' ? 'dark' : 'light'}`}>
        <div style={{ position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
          className="card-img-top"
          alt="News Thumbnail"
        />
        <div className="card-body">
          <h5 className={`card-title text-${mode === 'dark' ? 'light' : 'dark'}`}>{title}</h5>
          <p className={`card-text text-${mode === 'dark' ? 'light' : 'dark'}`}>{description}</p>
          <p className="card-text">
            <small className="text-muted">{`By ${author ? author : "Unknown"} on ${new Date(date).toGMTString()}`}</small>
          </p>
          <a href={newsUrl} className={`btn btn-sm btn-${mode === 'dark' ? 'outline-light' : 'dark'}`} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
