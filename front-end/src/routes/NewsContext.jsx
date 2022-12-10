// this is my news api key 5073ab7ebd72447e8e321fe070f28e8d
// https://newsapi.org/v2/everything?q=Apple&from=2022-10-23&sortBy=popularity&apiKey=5073ab7ebd72447e8e321fe070f28e8d

import React, {useEffect, useState } from "react";
import axios from "axios";
import "./NewsContext.css";

//export const NewsContext = createContext();

const News = (props) => {
  const [data, setData] = useState();
  const apiKey = "d3a68d3a93a54948a016a1553bc4d20c";

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=Crypto&from=2022-10-23&sortBy=popularity&apiKey=5073ab7ebd72447e8e321fe070f28e8d`
      )
      .then((response) => {setData(response.data); console.log("-->", data);})
      .catch((error) => console.log(error));
  }, []);

  return (
    <h2>TEST</h2>
    // <NewsContext.Provider value={{ data }}>
    //   {props.children}
    // </NewsContext.Provider>
  );
};

export default News

// const News = () => 
// {
//     return (
//         <div>News</div>
//     )
// }

// export default News