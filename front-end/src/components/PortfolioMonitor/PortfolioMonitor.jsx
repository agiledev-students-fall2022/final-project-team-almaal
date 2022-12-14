import React, { useEffect, useState } from "react";
import { Input, Table, Divider, Space } from "antd";
import "./PortfolioMonitor.css";
import axios from "axios";
//import DemoLine from "./DemoLine";
// require('dotenv').config({path: 'front-end\.env'})

// import { get } from 'react-scroll/modules/mixins/scroller';
const URL = process.env.REACT_APP_BACKEND_URL;
//finnhub stuff
const STOCK_API = "https://finnhub.io/api/v1/";
const TOKEN = "cdbkvuaad3ibgg4mqf8gcdbkvuaad3ibgg4mqf90";

//default columns at the beg of the form, not to be updated
const columns = [
  {
    title: "ticker",
    dataIndex: "ticker",
    // key: "ticker",
    width: "30%",
  },
  {
    title: "position",
    dataIndex: "position",
    // key: "position",
    width: "30%",
  },
  {
    title: "quantity",
    dataIndex: "quantity",
    //key: "quantity",
    width: "30%",
  },
  {
    title: "price",
    //key: "price",
    dataIndex: "price",
    width: "30%",
  },
  {
    title: "marketprice",
    //key: "marketprice",
    dataIndex: "marketprice",
    width: "30%",
  },
  {
    title: "profitloss",
    //key: "profitloss",
    dataIndex: "profitloss",
    width: "30%",
  },
];

export default function PortfolioMonitor() {
  //State of the stocks
  const [stocks, setStocks] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  /*SPrint -1 fetch data starts */
  //  async function fetchData()
  //   {
  //     const result = await axios("https://my.api.mockaroo.com/stock_data.json?key=8052c770");
  //     setStocks(result.data);
  //   }

  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  /*SPrint -1 fetch data ends */

  //FRONT_END!!
  useEffect(() => {
    //GET request to the database to fetch the stock which are already in our portfolio
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/home/portfolioData"
        ); //fetches data from back-end db -2

        //trying out stockFetcher seperately, still dn work
        // for (let i = 0; i < stocks.length; i++) {
        //   const responseFinn = await axios.get(
        //     `https://finnhub.io/api/v1/quote?symbol=${stocks[i].ticker}&token=${TOKEN}`
        //   ); //fetches api data of current maarekt price
        //   
        // } //we want to set this market price to the marketpruce in the fetched data in (2)

        //response.data[0].marketprice = 10;

        setStocks(response.data);
      } catch (error) {
        /*The option how to handle the error is totally up to you. 
                Ideally, you can send notification to the user */
        
      }
    };

    // const fetchMarketprice = async () => {
    //   for (let i = 0; i < stocks.length; i++) {
    //     try {
    //       const response = await axios.get(
    //         `https://finnhub.io/api/v1/quote?symbol=${stocks[i].ticker}&token=${TOKEN}`
    //       );

    //       //for (let i = 0; i < response.data.length; i++) {}
    //       //const result = stockFetcher(response.data[0].ticker);
    //       //const retrived = response.data;
    //       //response.data[0].marketprice = 10;
    //       
    //       
    //       //
    //       //setStocks(response.data);
    //     } catch (error) {
    //       /*The option how to handle the error is totally up to you.
    //             Ideally, you can send notification to the user */
    //       
    //     }
    //   }
    // };

    fetchData();
    //fetchMarketprice();
  }, [setStocks]);

  //   stocks.map((item)=>(
  //   // <handleFetch details={item}/>
  //   originData.push({
  //
  //     ticker: item.ticker,
  //     position:item.position,
  //     quantity:item.quantity,
  //     price:item.price,
  //     marketprice:item.marketprice,
  //     profitloss:item.profitloss,
  //   })
  //  ));
  // 

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  // const stockFetcher = (stock) => {
  //   const result = axios.get(
  //     `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${TOKEN}`
  //   );
  //   
  //   return result.data.c;
  // };

  //no need for Sprint-1

  // useEffect(() => {
  //     //Fetches prices and updates the state with current prices and profit or loss for the position
  //     stockFetcher(stocks, setStocks, profitLossCalculator);
  // }, []);

  //Calculates the profit or loss for a single position (No need for Sprint-1)
  // const profitLossCalculator = (price, currentPrice, position, quantity) => {
  //     let profitLoss = 0;

  //     if (currentPrice) {
  //         if (position === 'BUY') {
  //             profitLoss = (currentPrice - price) * quantity;
  //         } else {
  //             profitLoss = (price - currentPrice) * quantity;
  //         }
  //     }

  //     return profitLoss.toFixed(2);
  // };

  //Calculates the profit or loss for the whole portfolio (No need for Sprint-1)
  // const profitLossTotalCalculator = (stocks) => {
  //     let profitLossTotal = 0;

  //     stocks.forEach((s) => {
  //         if (!isNaN(Number(s.profitLoss))) {
  //             profitLossTotal += Number(s.profitLoss);
  //         }
  //     });

  //     return profitLossTotal.toFixed(2);
  // };

  // const fetchPrices = () => {
  //     //Fetches prices and updates the state with current prices and profit or loss for the position
  //     stockFetcher(stocks, setStocks, profitLossCalculator);
  // };

  return (
    <Space
      direction="verticle"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <div>
        <Table
          scroll={{ x: true }}
          columns={columns}
          dataSource={stocks}
          onChange={handleTableChange}
        />
      </div>
      {/* removed chart temporarily */}
      {/* <div>
        <DemoLine />
      </div> */}
    </Space>
  );
}

// const fetchData = () => {

//   fetch(`https://my.api.mockaroo.com/stockDATA.json?key=8052c770${qs.stringify(getRandomuserParams(tableParams))}`).then((res) => res.json())
//     .then(({ results }) => {
//       setStocks(results);
//       
//       setTableParams({
//         ...tableParams,
//         pagination: {
//           ...tableParams.pagination,
//           total: 200,
//           // 200 is mock data, you should read it from server
//           // total: data.totalCount,
//         },
//       });
//     });
// };

/* For each stock in a portfolio prints a row with info */
// {stocks.map((s) => {
//     return (
//         <div key={s.id}>
//             <div className='monitor-row-wrapper'>
//                 <div className='monitor-row'>{s.ticker}</div>
//                 <div className='monitor-row'>{s.position}</div>
//                 <div className='monitor-row'>{s.quantity}</div>
//                 <div className='monitor-row'>{s.price}</div>
//                 <div className='monitor-row'>
//                     {s.currentPrice ? s.currentPrice : null}
//                 </div>
//                 <div
//                     className={`${
//                         s.profitLoss > 0 ? 'profit-row' : 'loss-row'
//                     } monitor-row`}
//                 >
//                     {s.profitLoss ? s.profitLoss : null}
//                 </div>
//             </div>
//         </div>
//     );
// })}
// <div className='monitor-summary-row-wrapper'>
//     <div className='monitor-summary-row'>Total:</div>
//     <div
//         className={`${
//             profitLossTotalCalculator(stocks)
//                 ? 'profit-row'
//                 : 'loss-row'
//         } monitor-summary-row`}
//     >
//         {profitLossTotalCalculator(stocks)}
//     </div>
// </div>
// <button className='monitor-fetch-prices' onClick={fetchPrices}>
//     <span>Update prices</span>
// </button>
