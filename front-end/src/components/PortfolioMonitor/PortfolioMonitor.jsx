import React, { useEffect, useState } from "react";
import { Input, Table, Divider, Space, Button } from "antd";
import "./PortfolioMonitor.css";
import axios from "axios";
import DemoLine from "./DemoLine";
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
  const [showfooter, setShowFooter] = useState(true);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  //FRONT_END!!
  useEffect(() => {
    //GET request to the database to fetch the stock which are already in our portfolio
    const fetchData = async () => {
      try {
        const response = await axios.get(
          URL + "home/portfolioData"
        ); //fetches data from back-end db -2

        setStocks(response.data);
      } catch (error) {
        /*The option how to handle the error is totally up to you. 
                Ideally, you can send notification to the user */
      }
    };

    fetchData();
  }, [setStocks]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  //calculating the totAL INVESTMENT and profit/loss
  let totalInvest = 0;
  let totalProfitLoss = 0;
  const totalInvestment = () => {
    totalInvest = 0;
    totalProfitLoss = 0;
    for (let i = 0; i < stocks.length; i++) {
      //calc total investment
      if (stocks[i].position == "BUY") {
        totalInvest += stocks[i].price * stocks[i].quantity;
      }
      totalProfitLoss += stocks[i].profitloss;
    }
    const final =
      "totalProfitLoss: $" +
      totalProfitLoss +
      " and totalInvestment: $" +
      totalInvest;
    return final;
  };
  // const defaultFooter = () => {
  //   const totalInvestment = totalInvestment();
  // };
  const tableProps = {
    footer: showfooter ? totalInvestment : undefined,
  };
  return (
    <Space
      direction="verticle"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <Table
        {...tableProps}
        style={{ maxWidth: 250 }}
        scroll={{ x: true }}
        columns={columns}
        dataSource={stocks}
        onChange={handleTableChange}
      />
      {/* removed chart temporarily */}
      {/* <div>
        <DemoLine />
      </div> */}
    </Space>
  );
}
