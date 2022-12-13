import React, { useEffect, useState } from "react";
import NewsArticle from "./NewsArticle";
var Sentiment = require("sentiment");
var sentiment = new Sentiment();

const watson_apiKey = "1ImEN4VUwxyI00MBSMtpMJnccqYFgmcRyqwnUETuVxTW";

// const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
//   version: '2022-04-07',
//   authenticator: new IamAuthenticator({
//     apikey: `${watson_apiKey}`,
//   }),
//   serviceUrl: 'https://api.us-east.natural-language-understanding.watson.cloud.ibm.com',
// });

function get_sentiment(data) {
  let result = sentiment.analyze(data);
  return result;
}

function News(props) {
  const [data, setData] = useState();
  //const apiKey = "d3a68d3a93a54948a016a1553bc4d20c";

  useEffect(() => {
    const qInTitle = "cryptocurrency";
    const from = "2022-12-10";
    const apiKey = "pub_143796004cafc2a2297b268a3371c8070ffb9";
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${qInTitle}`; //`${proxyUrl}https://newsapi.org/v2/everything?qInTitle=${qInTitle}&from=${from}language=en&apiKey=${apiKey}`;
    const request = new Request(url);

    fetch(request)
      .then((response) => response.json())
      .then((news) => {
        setData(news.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ width: "100%", overflowY: "auto" }}>
      {data != undefined &&
        data.map((val) => {
          if(val.description != null){
            val["sentiment"] = get_sentiment(val.description).comparative;
            return <NewsArticle data={val} />;
          }
        })}

      {data == undefined && (
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "500px",
          }}
        >
          Loading ...
        </h3>
      )}
    </div>
  );
}

export default News;
