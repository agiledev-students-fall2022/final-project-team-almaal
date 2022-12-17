import React from "react";
import './NewsArticle.css';

let col;

function NewsArticle({ data }) {
 
  if(0 < parseFloat(data.sentiment).toFixed(2) && parseFloat(data.sentiment).toFixed(2) < 3.5){
    col = '#FAEACB';
  }
  else if(3.5 < parseFloat(data.sentiment).toFixed(2) && parseFloat(data.sentiment).toFixed(2) < 5){
    col = '#99CC99';
  }
  else if(parseFloat(data.sentiment).toFixed(2) < 0){
    col = '#F7DBD7';
  }

  if(data.description.length < 500){
    return (
      <div className="news" style={{background: col}}>
        <a className="news__title" href={data.link}>{data.title}</a> 
        <br/><br/>
        <p className="news__desc">{data.description}</p>
        <div className="score">
          <h5>{ parseFloat(data.sentiment).toFixed(2)}</h5>
        </div>
        <span className="news__author">{data.creator}</span> <br />
        <span className="news__published">{(data.pubDate.split(' ')[0])}</span>
      </div>
    );
  }
}

export default NewsArticle;
