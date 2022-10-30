import React, { useEffect, useState } from 'react';
import { Input, Table} from 'antd';
import qs from 'qs';
import stockFetcher from '../utils/stockFetcher';
import './PortfolioMonitor.css';
import axios from 'axios'


const originData = [];

//default columns at the beg of the form, not to be updated 
const columns = [
  {
    title: 'ticker',
    dataIndex: 'ticker',
    key: 'ticker',
    width: '30%',
    /*render: (text) => <a>{text}</a>,*/
  },
  {
    title: 'position',
    dataIndex: 'position',
    key: 'position',
    width: '30%',
  },
  {
    title: 'quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    width: '30%',
  },
  {
    title: 'price',
    key: 'price',
    dataIndex: 'price',
    width: '30%',
  },
  {
    title: 'marketprice',
    key: 'marketprice',
    dataIndex: 'price',
    width: '30%',
  },
  {
    title: 'profitloss',
    key: 'profitloss',
    dataIndex: 'profitloss',
    width: '30%',
  },
  ];


  const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});





export default function PortfolioMonitor() {
    //State of the stocks
    const [stocks, setStocks] = useState([]);
    const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

 

 async function fetchData()
  {
    const result = await axios("https://my.api.mockaroo.com/stock_data.json?key=8052c770");
    setStocks(result.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

 
  stocks.map((item)=>(
  // <handleFetch details={item}/>
  originData.push({
    key:item.id,
    ticker: item.ticker,
    position:item.position,
    quantity:item.quantity,
    price:item.price,
    marketprice:item.marketprice,
    profitloss:item.profitloss,
  })
 ));
  console.log("Hurray: "+originData.map(item=>(item.ticker))+"   ");



  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  

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

            <Table
                columns={columns}
                dataSource={originData}
                onChange={handleTableChange}>
            
          </Table>
    );
}







  // const fetchData = () => {

  //   fetch(`https://my.api.mockaroo.com/stockDATA.json?key=8052c770${qs.stringify(getRandomuserParams(tableParams))}`).then((res) => res.json())
  //     .then(({ results }) => {
  //       setStocks(results);
  //       console.log(results);
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

