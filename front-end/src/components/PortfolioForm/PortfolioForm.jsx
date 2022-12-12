import React, { useState } from "react";
import { Button, Form, InputNumber, Input, Modal } from "antd";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  count,
  setData,
  setCount,
  data,
}) => {
  const [form] = Form.useForm();
  //Function that handles the new stock additions to our portfolio
  return (
    <Modal
      open={open}
      title="Create a new investment"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={async () => {
        const current = new Date();
        const date = `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()}`;
        const newStock = {
          //key: count + 1,
          ticker: form.getFieldValue("ticker"),
          position: form.getFieldValue("position"),
          quantity: form.getFieldValue("quantity"),
          price: form.getFieldValue("price"),
          timestamp: date, //time is stored in day/month/year format
        };
        setData(newStock);
        setCount(count + 1);
        //console.log("IN FORM 1:", newStock);
        // const requestOptions = {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(newStock),
        // };
        // //POST request to the database to add a new stock
        // await fetch(`http://localhost:3001/home/`, requestOptions)
        //   .then((response) => response.json)
        //   .then((data) => console.log(data));
        // console.log("in form 2:", newStock);
        const result = await axios
          //.post(URL + `/home/`, newStock)
          .post("http://localhost:3001/home/", newStock)
          .then((response) => response.json)
          //.then((data) => console.log(data))
          .catch(function (error) {
            console.log(error);
          });

        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="ticker"
          label="Ticker"
          rules={[
            {
              required: true,
              message: "Please input a ticker name like AAPL for Apple",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            {
              required: true,
              message: "Please input the value",
              //min:0,
              //validator: checkPrice
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input the value",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={[
            {
              required: true,
              message: "Please input BUY or SELL",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        ></Form.Item>
      </Form>
    </Modal>
  );
};
const PortfolioForm = ({ setCount, count, setData, data }) => {
  const [open, setOpen] = useState(false);
  //const[data,setData]=useState('');
  const onCreate = (values) => {
    //console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        New Investment
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        setCount={setCount}
        count={count}
        setData={setData}
        data={data}
      />
    </div>
  );
};
export default PortfolioForm;
