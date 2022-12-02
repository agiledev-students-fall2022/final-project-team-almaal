import React, { useState } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
const CollectionCreateForm = ({ open, onCreate, onCancel, data, setData, setEditingKey }) => {
  const [form] = Form.useForm();

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
      //console.log(newData[index]);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData[index]),
    };
  //POST request to the database to add a new stock
    await fetch(`http://localhost:3001/home/`, requestOptions)
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

  return (
    <Modal
      open={open}
      title="Add a new investment"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {    
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const PortfolioForm = ({data, setData, setEditingKey}) => {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
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
        New Collection
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        data={data}
        setData={setData}
        setEditingKey={setEditingKey}
      />
    </div>
  );
};
export default PortfolioForm;
