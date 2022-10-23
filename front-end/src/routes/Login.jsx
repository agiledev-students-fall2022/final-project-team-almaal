import React from 'react'
import { Space, Button, Input, Avatar } from 'antd'
import { AliwangwangOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

const Login = ()=>{
    return (
        <div>
            <Space direction="vertical">
                <Avatar icon={<AliwangwangOutlined />}></Avatar>
                <Button shape="round" icon={<GoogleOutlined />} block>
                    Continue with Google
                </Button>
                <Button shape="round" icon={<FacebookOutlined />} block >
                    Continue with Facebook
                </Button>
                OR
                <Input placeholder="Email" />
                <Input placeholder="Password" />
                <Button type="primary" shape="round">
                    Log In
                </Button>
                <Button type="link">
                    No account yet? Create one!
                </Button>
            </Space>
        </div>
    );
}
export default Login