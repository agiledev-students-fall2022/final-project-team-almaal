import React from 'react'
import { Space, Button, Input, Avatar } from 'antd'
import { AliwangwangOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

const Login = ()=>{
    return (
        <div>
            <Space direction="vertical">
                <Avatar icon={<AliwangwangOutlined />}></Avatar>
                <Button shape="round" icon={<GoogleOutlined />} >
                    Continue with Google
                </Button>
                <Button shape="round" icon={<FacebookOutlined />}>
                    Continue with Facebook
                </Button>
                OR

            </Space>
        </div>
    );
}
export default Login