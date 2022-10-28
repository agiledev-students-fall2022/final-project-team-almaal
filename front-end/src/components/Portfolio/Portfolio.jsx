import { Button, Form, Input, Popconfirm, Table} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import{Select} from 'antd';
import DATABASE from '../utils/database';
//Importing the database endpoint as string to be used
import './Portfolio.css';
import axios from 'axios'
import useItems from 'antd/lib/menu/hooks/useItems';
import qs from 'qs';

//These components are for the Portfolio
const { Option } = Select;
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async (e) => {
    //Prevents the default behavior of the event to refresh the page
    e.preventDefault();
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});


const Portfolio = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  //to generate the table and functionalitites
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      Ticker: 'Apple Inc',
      Position: 'BUY',
      Quantity: 10,
      Price: 200,
    },
  ]);
  const [count, setCount] = useState(2);
   
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
//default columns at the beg of the form, not to be updated 
const defaultColumns = [
  {
    title: 'Ticker',
    dataIndex: 'ticker',
    key: 'ticker',
    width: '30%',
    editable: true,
    /*render: (text) => <a>{text}</a>,*/
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    width: '30%',
    render: (position) =>
    (<Select
      defaultValue="buy"
      style={{
        width: 120,
      }}
      onChange={handleChange}
    >
      <Option value="buy">BUY</Option>
      <Option value="sell">SELL</Option>
    </Select>)
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    width: '30%',
    editable: true,
  },
  {
    title: 'Price ($)',
    key: 'price',
    dataIndex: 'price',
    width: '30%',
    editable: true,
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, record) =>
    dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
  },
  ];

 

  const handleAdd = () => {
    const newData = {
      key: count,
      Ticker: 'Apple',
      Position: 'BUY',
      Quantity: 10,
      Price: 200,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };


  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`https://my.api.mockaroo.com/stockData.json?key=8052c770${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  
    //   useEffect(() => {
    //     //GET request to the mock API database to fetch the stock
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`https://${DATABASE}.json`);
    //             const data = await response.json();

    //             //Validates that the database is not empty
    //             if (data) {
    //                 //If not empty modifies the data with fetched results and updates state
    //                 const dataModified = Object.keys(data).map((key) => ({
    //                     id: key,
    //                     Ticker: data[key]['ticker'],
    //                     Position: data[key]['position'],
    //                     Quantity: data[key]['quantity'],
    //                     Price: data[key]['price'],
    //                 }));
    //                 setStocks(dataModified);
    //             }
    //         } catch (error) {
    //             /*The option how to handle the error is totally up to you. 
    //             Ideally, you can send notification to the user */
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, [setStocks]);







  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
        {/* <p> {stocks.map(item => (
          <handleData key={item.id} details={item}/>
        ))}</p> */}
      </Button>
      
      
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        //rowKey={(record) => record.login.uuid}
        dataSource={dataSource}
        loading={loading}
        onChange={handleTableChange}
        bordered
        columns={columns}
      />
    </div>
  );
}























// const columns = [
//   {
//     title: 'Ticker',
//     dataIndex: 'ticker',
//     key: 'ticker',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Position',
//     dataIndex: 'position',
//     key: 'position',
//   },
//   {
//     title: 'Quantity',
//     dataIndex: 'quantity',
//     key: 'quantity',
//   },
//   {
//     title: 'Price',
//     key: 'price',
//     dataIndex: 'price',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     dataIndex: 'action',


//   },
// ];




// export default function Portfolio({ stocks, setStocks }) {
//     const [inputVisibility, setInputVisibility] = useState(false);

//     useEffect(() => {
//         //GET request to the database to fetch the stock which are already in our portfolio
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`https://${DATABASE}.json`);
//                 const data = await response.json();

//                 //Validates that the database is not empty
//                 if (data) {
//                     //If not empty modifies the data with fetched results and updates state
//                     const dataModified = Object.keys(data).map((key) => ({
//                         id: key,
//                         ticker: data[key]['ticker'],
//                         position: data[key]['position'],
//                         quantity: data[key]['quantity'],
//                         price: data[key]['price'],
//                     }));
//                     setStocks(dataModified);
//                 }
//             } catch (error) {
//                 /*The option how to handle the error is totally up to you. 
//                 Ideally, you can send notification to the user */
//                 console.log(error);
//             }
//         };

//         fetchData();
//     }, [setStocks]);

//     //Function that removes the stock from portfolio
//     const handleRemoveStock = async (stockId) => {
//         try {
//             //DELETE request to the database to delete specific stock by id
//             await fetch(`https://${DATABASE}/${stockId}.json`, {
//                 method: 'DELETE',
//                 'Content-Type': 'application/json',
//             });

//             //Updates state by removing this stock
//             setStocks((stocks) => stocks.filter((s) => s.id !== stockId));
//         } catch (error) {
//             /*The option how to handle the error is totally up to you. 
//             Ideally, you can send notification to the user */
//             console.log(error);
//         }
//     };

//     return (
//         <div className='portfolio-page'>
//             {/* <div className='portfolio-main-row-wrapper'>
//                 <div className='portfolio-main-row'>Ticker</div>
//                 <div className='portfolio-main-row'>Position</div>
//                 <div className='portfolio-main-row'>Quantity</div>
//                 <div className='portfolio-main-row'>Price</div>
//             </div> */}

//             {/* For each stock in database renders a row with info */}
//             {stocks.map((s) => {
//                 return (
//                     <div className='portfolio-row-wrapper' key={s.id}>
//                         <div className='portfolio-row'>{s.ticker}</div>
//                         <div className='portfolio-row'>{s.position}</div>
//                         <div className='portfolio-row'>{s.quantity}</div>
//                         <div className='portfolio-row'>{s.price}</div>
//                         <button
//                             className='remove-stock-button'
//                             onClick={() => handleRemoveStock(s.id)}
//                         >
//                             <span>-</span>
//                         </button>
//                     </div>
//                 );
//             })}
//             <Table dataSource={stocks} columns={columns} />;
//             {/* Form to add new stock to the portfolio */}
//             {inputVisibility ? (
//                 <PortfolioForm
//                     setStocks={setStocks}
//                     setInputVisibility={setInputVisibility}
//                 />
//             ) : null}
//             <p>

                            
//             </p>
//             <button
//                 className='add-more-button'
//                 onClick={() => setInputVisibility(!inputVisibility)}
//             >
//                 <span>ADD NEW STOCK</span>
//             </button>
//         </div>
//     );
// }

export default Portfolio