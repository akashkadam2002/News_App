import React from 'react'

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date } = props
  return (
    <div className='my-3'>
      <div className="card">
        <img src={!imgUrl ? "https://cdn.ndtv.com/common/images/ogndtv.png" : imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem