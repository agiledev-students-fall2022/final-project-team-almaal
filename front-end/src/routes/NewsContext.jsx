// this is my news api key 5073ab7ebd72447e8e321fe070f28e8d
// https://newsapi.org/v2/everything?q=Apple&from=2022-10-23&sortBy=popularity&apiKey=5073ab7ebd72447e8e321fe070f28e8d

import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './NewsContext.css';

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
    const [data, setData] = useState();
    const apiKey = '5073ab7ebd72447e8e321fe070f28e8d';

    useEffect(() => {
        axios
            .get(
                `https://newsapi.org/v2/everything?q=Apple&from=2022-10-23&sortBy=popularity&apiKey=5073ab7ebd72447e8e321fe070f28e8d`
            )
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <NewsContext.Provider value={{ data }}>
            {props.children}
        </NewsContext.Provider>
    );
};

export default NewsContextProvider;

// const News = () =>
// {
//     return (
//         <div>News</div>
//     )
// }

// export default News
