import React from 'react'
import { Link } from 'react-router-dom';
import { Space, Button, Input, Avatar, Typography } from 'antd'
import { RadarChartOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import styles from './Login.module.css';
import axios from "axios";

const { Title } = Typography;

const URL = process.env.REACT_APP_BACKEND_URL

function login(e) {
    e.preventDefault();
    let request = {
        email: document.getElementById('exampleInputEmail1').value,
        password: document.getElementById('exampleInputPassword1').value
    }
    axios.post(URL + "/login", request)
        .then(resp => {
            alert(resp.data.message);
        })
        .catch(err => {
            console.log(err);
        })
}

const Login = () => {
    return (
        <div>
            {/* <Title level={2} className={styles.title}>Log In With Almaal Account</Title> */}
            <Space direction="vertical" align="center" className={styles.container}>
                <Avatar size="large" icon={<RadarChartOutlined />}></Avatar>
                <Button shape="round" icon={<GoogleOutlined />} block>
                    Continue with Google
                </Button>
                <Button shape="round" icon={<FacebookOutlined />} block >
                    Continue with Facebook
                </Button>
                <Title Level={5} className={styles.sectionTitle}>OR</Title>
                {/* <Input placeholder="Email" size="large" block />
                <Input placeholder="Password" size="large" />
                <Button type="primary" shape="round">
                    <Link to="/">Log In</Link>
                </Button>
                <Button type="link">
                    <Link to="/createaccount">No account yet? Create one!</Link>
                </Button> */}
                {/* </Space> */}
                <form onSubmit={(e) => login(e)}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">login!</button>
                </form>
            </Space>
        </div>
    );
}


export default Login