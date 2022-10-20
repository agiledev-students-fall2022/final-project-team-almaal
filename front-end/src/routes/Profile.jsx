import React, {useState} from 'react'
import { Typography, Space, Divider, Avatar,Button, Input, Switch, Card, List, Tooltip } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';

const { Tab } = Input
const { ProfilePic } = Avatar;

const Profile = ({total_friends=0, total_groups=0, total_investment=0, total_pl=0}) => {
        const [username, setUsername] = useState('');
        return(
        <div>
            <Space direction="vertical">
                <Avatar icon={<UserOutlined />}/>
                Username
                <Space>
                    <Input.Group compact>
                        <Input defaultValue="current_username" disabled />
                        <Tooltip>
                            <Button icon={<EditOutlined />} />
                        </Tooltip>
                    </Input.Group>
                </Space>
                Password
                <Space>
                    <Input.Group compact>
                        <Input defaultValue="current_password" disabled />
                        <Tooltip>
                            <Button icon={<EditOutlined />} />
                        </Tooltip>
                    </Input.Group>
                </Space>
                <Space>Investment Visibility<Switch defaultChecked ></Switch></Space>
                <Space>Hide Profile<Switch></Switch></Space>
                <Divider/>
                <List>
                    <Space>
                        <Card size="small" title="Total Friends">{total_friends}</Card>
                        <Card size="small" title="Total Groups">{total_groups}</Card>
                        <Card size="small" title="Total Investment">{total_investment}</Card>
                        <Card size="small" title="Total P/L">{total_pl}</Card>
                    </Space>
                </List>
            </Space>
        </div>
);
}
export default Profile