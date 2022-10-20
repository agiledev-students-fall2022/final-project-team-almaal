import React from 'react'
import { Typography, Space, Divider, Avatar, Input, Switch } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Tab } = Input;
const { ProfilePic } = Avatar;

const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

const Profile = () => (
        <div>
            <Space direction="vertical">
                <Avatar icon={<UserOutlined />}/>
                <Input placeholder="Enter Username" prefix={<UserOutlined />} />
                <Input placeholder="Enter Password" prefix={<UserOutlined />} />
                <Space>Investment Visibility<Switch defaultChecked ></Switch></Space>
                <Space>Hide Profile<Switch></Switch></Space>
                <Divider/>
            </Space>
        </div>
);

export default Profile