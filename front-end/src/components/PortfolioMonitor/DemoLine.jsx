import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import axios from 'axios'

const URL = process.env.REACT_APP_BACKEND_URL

const DemoLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {

    /*Sprint-1 part*/
    // await fetch('https://my.api.mockaroo.com/chart_data.json?key=8052c770')
    //   .then((response) => response.json())
    //   .then((json) => setData(json))
    //   .catch((error) => {
    //     console.log('fetch data failed', error);
    //   });
    /*Sprint-1 part ends*/

    try {
      const response = await axios.get(URL + `home/portfolioChartData`);
      //Validates that the database is not empty
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      /*The option how to handle the error is totally up to you. 
      Ideally, you can send notification to the user */
      console.log('fetch data for graph failed', error);
    }
  };
  const COLOR_PLATE_10 = [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
  ];
  const container = document.getElementById('container');
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    point: {
      shape: ({ category }) => {
        return category === 'Monsanto Company' ? 'square' : 'circle';
      },
      style: ({ year }) => {
        return {
          r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
        };
      },
    },
  };

  return <Line {...config} />;
};


export default DemoLine
