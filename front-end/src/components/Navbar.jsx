
import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link, useLocation
} from "react-router-dom";
import "antd/dist/antd.css";
import styles from './Navbar.module.css'
import {
    ContainerOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined, //for friends
    ApartmentOutlined, //for groups
    KeyOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RadarChartOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { Dropdown } from 'antd';
import { Button } from 'antd';
import { Space } from 'antd';
import { useState } from 'react';
import { PageHeader, Typography } from 'antd';





const { SubMenu } = Menu;
const { Header, Sider } = Layout;
const { Paragraph } = Typography;


const menu = (
    <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        // mode="inline"
        theme="dark"

    >
        <Menu.Item key="1" icon={<DesktopOutlined />}>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link to="friends">Friends</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ApartmentOutlined />}>
            <Link to="groups">Feed</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ContainerOutlined />}>
            <Link to="news">News</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<RadarChartOutlined />}>
            <Link to="login">Logout</Link>
        </Menu.Item>
    </Menu>

);

const login_menu = (
    <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        // mode="inline"
        theme="dark"

    >
        <Menu.Item key="1" icon={<DesktopOutlined />}>
            <Link to="/">Login</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<RadarChartOutlined />}>
            <Link to="register">Register</Link>
        </Menu.Item>
    </Menu>

);

/**
 * A React component that is used for the navigation bar displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

const Navbar = ({flag}) => {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const location = useLocation();
    const notlogin = location.pathname !== "/login" && location.pathname !== '/createaccount';

    if(flag){
        return(
        
            <div className={styles.container}>
                <PageHeader
                    title="Almaal"  //how to get page name here?
                    className="site-page-header"
                    // tags={<Tag color="blue">Running</Tag>}
                    extra={notlogin && [
                        <Dropdown key="1" overlay={login_menu} trigger={['click']} placement="bottomRight">
                            <a onClick={(e) => e.preventDefault()}>
                                <Space className={styles.button}>
                                    <Button
                                        type="primary"
                                        onClick={toggleCollapsed}
                                    >
                                        {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 20, }} /> : <MenuFoldOutlined style={{ fontSize: 20, }} />}
                                    </Button>

                                </Space>
                            </a>
                        </Dropdown>
                    ]}
                    avatar={{
                        // src: 'https://www.vecteezy.com/vector-art/563714-finance-logo-and-symbols-vector-concept',
                        icon: <RadarChartOutlined style={{ fontSize: '30px', alignSelf: 'right' }} />
                    }}

                >
                </PageHeader>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <PageHeader
                title="Almaal"  //how to get page name here?
                className="site-page-header"
                // tags={<Tag color="blue">Running</Tag>}
                extra={notlogin && [
                    <Dropdown key="1" overlay={menu} trigger={['click']} placement="bottomRight">
                        <a onClick={(e) => e.preventDefault()}>
                            <Space className={styles.button}>
                                <Button
                                    type="primary"
                                    onClick={toggleCollapsed}
                                >
                                    {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 20, }} /> : <MenuFoldOutlined style={{ fontSize: 20, }} />}
                                </Button>

                            </Space>
                        </a>
                    </Dropdown>
                ]}
                avatar={{
                    // src: 'https://www.vecteezy.com/vector-art/563714-finance-logo-and-symbols-vector-concept',
                    icon: <RadarChartOutlined style={{ fontSize: '30px', alignSelf: 'right' }} />
                }}

            >
            </PageHeader>
        </div>
    );
}




// make this component available to be imported into any other file






export default Navbar