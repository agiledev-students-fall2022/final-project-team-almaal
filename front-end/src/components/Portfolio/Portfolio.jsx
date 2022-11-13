import { Button, Form, Input, Popconfirm, Table, InputNumber,Typography} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import{Select} from 'antd';
import axios from 'axios'
//Importing the database endpoint as string to be used
import './Portfolio.css';
import { ErrorResponse } from '@remix-run/router';

//These components are for the Portfolio
const { Option } = Select;


const originData = [];
for (let i = 0; i < 2; i++) {
  originData.push({
    key: i.toString(),
    ticker: 'Apple Inc',
    position: 'BUY',
    quantity: 10,
    price: i*150,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};



const Portfolio = () => {

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(2);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ticker: '',
      position: '',
      quantity: '',
      price: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      console.log(newData[index]);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData[index]),
    };
  //POST request to the database to add a new stock
    await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/home/`, requestOptions)
    .then(response=>response.json)
    .then(data=>console.log(data) )         

        
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.err('Validate Failed:', errInfo);
    }
  };





  //const [data, setData] = useState();
  
  // const [tableParams, setTableParams] = useState({
  //   pagination: {
  //     current: 1,
  //     pageSize: 10,
  //   },
  // });
  //to generate the table and functionalitites
  // const [dataSource, setDataSource] = useState([
  //   {
  //     key: 1,
  //     Ticker: 'Apple Inc',
  //     Position: 'BUY',
  //     Quantity: 10,
  //     Price: 200,
  //   },
  // ]);
  
   
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
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
      // onChange={handleChange}
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
    data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
  },
    {
      title: 'Operation',
      key: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'price' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
 

  // const handleNew = (newData) => {
  //   // const newData = {
  //   //   key: count,
  //   //   Ticker: 'Apple',
  //   //   Position: 'BUY',
  //   //   Quantity: 10,
  //   //   Price: 200,
  //   // };
  //   const addData={
  //     Ticker: newData.Ticker,
  //     Position: newData.Position,
  //     Quantity: newData.Quantity,
  //     Price: newData.Price,    
  //   }
  //   setDataSource([...dataSource, addData]);
  //   setCount(count + 1);
  // };


  const handleAdd = async() => {

        //     try {
        //     //Basic validation if user entered a ticker, price and quantity above 0
        //     if (
        //         dataSource.Ticker &&
        //         dataSource.Price > 0 &&
        //         dataSource.Quantity > 0
        //     ) {
        //       axios
        //       // post new message to server
        //       .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/`)
        //       .then(response => {
        //         handleNew(response.data)
               
        //       })
        //     }
        // } catch (error) {
        //     /*The option how to handle the error is totally up to you. 
        //     Ideally, you can send notification to the user */
        //     console.log(error);
        // }
    const newData = {
      key: count,
      ticker: 'Apple',
      position: 'BUY',
      quantity: 10,
      price: 200,
    };
    setData([...data, newData]);
    setCount(count + 1);
  };



  // //parses and saves the newly added data
  // const handleSave = (row) => {
  //   const newData = [...dataSource];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, {
  //     ...item,
  //     ...row,
  //   });
  //   setDataSource(newData);
  //   console.log("Data saved");
  // };
  // const components = {
  //   body: {
  //     row: EditableRow,
  //     cell: EditableCell,
  //   },
  // };


  // const columns = defaultColumns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave,
  //     }),
  //   };
  // });

  
  // const handleTableChange = (pagination, filters, sorter) => {
  //   setTableParams({
  //     pagination,
  //     filters,
  //     ...sorter,
  //   });
  // };
  
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



  const components = {
    body: {
      cell: EditableCell,
    },
  };



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
      </Button>

      <Form form={form} component={false}>
      <Table
        components={components}
        bordered
        dataSource={data}
        columns={mergedColumns}
        loading={loading}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
      
      {/* <Table
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        
        onChange={handleTableChange}
        bordered
        columns={columns}
      /> */}
    </div>
  );
}

export default Portfolio





















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

