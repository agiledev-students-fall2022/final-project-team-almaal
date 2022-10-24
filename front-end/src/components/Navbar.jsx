
import React from 'react'
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import './Navbar.css'
import {
  ContainerOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined, //for friends
  ApartmentOutlined, //for groups
  KeyOutlined ,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { Dropdown} from 'antd';
import { Button} from 'antd';
import { Space} from 'antd';
import { useState } from 'react';
import { PageHeader, Typography } from 'antd';



  

const { SubMenu } = Menu;
const { Header, Sider} = Layout;
const { Paragraph } = Typography;


const menu = (  
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            //inlineCollapsed={collapsed}
        >
            <Menu.Item key="1" icon={<DesktopOutlined /> }>
                Home
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                Profile
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
                Friends
            </Menu.Item>
            <Menu.Item key="4" icon={<ApartmentOutlined />}>
                Groups
            </Menu.Item>
            <Menu.Item key="5" icon={<ContainerOutlined />}>
                News
            </Menu.Item>
            <Menu.Item key="6" icon={<RadarChartOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
  
 );





/**
 * A React component that is used for the navigation bar displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

const Navbar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
return(
    <PageHeader
        title="Almaal"  //how to get page name here?
        className="site-page-header"
        // subTitle="This is a subtitle"
        // tags={<Tag color="blue">Running</Tag>}
        extra={[
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()}>
            <Space>
                
                <Button 
                type="primary"
                onClick={toggleCollapsed}    
                >
                    {collapsed ? <MenuUnfoldOutlined style={{fontSize: 20, }}/> : <MenuFoldOutlined style={{fontSize: 20, }}/>} 
                </Button>
               
            </Space>
            </a>
        </Dropdown>
        ]}
        avatar={{
        // src: 'https://www.vecteezy.com/vector-art/563714-finance-logo-and-symbols-vector-concept',
        icon:<RadarChartOutlined style={{ fontSize: '30px', alignSelf: 'right' }} />
        }}
        
        >
  </PageHeader>
    );
}


















// const Navbar = () => {
//  const [collapsed, setCollapsed] = useState(false);
//  const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//  const menu = (  
//         <Menu
//             defaultSelectedKeys={['1']}
//             defaultOpenKeys={['sub1']}
//             mode="inline"
//             theme="dark"
//             inlineCollapsed={collapsed}
//         >
//             <Menu.Item key="1" icon={<DesktopOutlined />}>
//                 Home
//             </Menu.Item>
//             <Menu.Item key="2" icon={<UserOutlined />}>
//                 Profile
//             </Menu.Item>
//             <Menu.Item key="3" icon={<TeamOutlined />}>
//                 Friends
//             </Menu.Item>
//             <Menu.Item key="4" icon={<ApartmentOutlined />}>
//                 Groups
//             </Menu.Item>
//             <Menu.Item key="5" icon={<ContainerOutlined />}>
//                 News
//             </Menu.Item>
//             <Menu.Item key="6" icon={<RadarChartOutlined />}>
//                 Logout
//             </Menu.Item>
//         </Menu>
  
//  );



//   return (
//     <div style={{ width: 1300 }}>
//         <Header
//           className="Header-navbar"
//           style={{
//             padding: 0,
//           }}
//         >
        
//         <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
//             <a onClick={(e) => e.preventDefault()}>
//             <Space>
                
//                 <Button 
//                 type="primary"
//                 onClick={toggleCollapsed}
                
//                 >
//                     {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
//                 </Button>
               
//             </Space>
//             </a>
//         </Dropdown>
       
        
//         <Space>
//         <nav className="Header-logo">
//         <a href='www.google.com'>
//             {<RadarChartOutlined style={{ fontSize: '50px', alignSelf: 'right' }} />}
//         </a>         
//         </nav>
//         </Space>
//         </Header> 
        
//    </div>
    
   
//     );




// return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="logo" />
//         <Menu
//           theme="light"
//           mode="inline"
//           defaultSelectedKeys={['0']}
//           items={[
//             {
//                 label: 'Home',
//                 key: '0',
//                 icon:<DesktopOutlined />,
//             },
//             {
//                 label: 'Profile',
//                 key: '1',
//                 icon:<UserOutlined />,
            
//             },
//             {
//                 label: 'Friends',
//                 key: '2',
//                 icon:<TeamOutlined />,
//             },
//             {
//                 label: 'Groups',
//                 key: '3',
//                 icon:<ApartmentOutlined />,
//             },
//             {
//                 label: 'News',
//                 key: '4',
//             },
//             {
//                 label: 'Logout',
//                 key: '5',
//                 icon:<KeyOutlined />,
//             },
//           ]}
//         />
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           className="site-layout-background"
//           style={{
//             padding: 0,
//           }}
//         >
//           {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//             className: 'trigger',
//             onClick: () => setCollapsed(!collapsed),
//           })}
//         </Header>
//         <Content
//           className="site-layout-background"
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//           }}
//         >
//           Content
//         </Content>
//       </Layout>
//     </Layout>
//   );

//}











//const menu = (
//   <Menu
//     defaultSelectedKeys={['1']}
//     defaultOpenKeys={['sub1']}
//     mode="inline"
//     theme="dark"
//     inlineCollapsed={collapsed}
//     items={[
//         {
//         label: (<a href="https://www.antgroup.com">1st menu item</a>),
//         key: '0',
//         icon:<DesktopOutlined />,
//       },
//       {
//         label: (<Link to="/">Home</Link>),
//         key: '0',
//         icon:<DesktopOutlined />,
//       },
//       {
//         label: (<Link to="/profile">Profile</Link>),
//         key: '1',
//          icon:<UserOutlined />,
    
//       },
//       {
//         label: (<Link to="/friends">Friends</Link>),
//         key: '2',
//         icon:<TeamOutlined />,
//       },
//       {
//         label: (<Link to="/groups">Groups</Link>),
//         key: '3',
//         icon:<ApartmentOutlined />,
//       },
//       {
//         label: <Link to="/news">News</Link>,
//         key: '4',
//       },
//       {
//         label: (<Link to="/signin-screen">Logout</Link>),
//         key: '5',
//         icon:<KeyOutlined />,
//       },
//       {
//         type: 'divider',
//       },
//       {
//         label: '3rd menu item',
//         key: '3',
//       },
//     ]}
//   />
// );

// const Navbar = () => {
// const [collapsed, setCollapsed] = useState(false);
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };
//  return(
//     <Dropdown overlay={menu} trigger={['click']}>
//     <a onClick={(e) => e.preventDefault()}>
//       <Space>
//         <nav className="Header-navbar">
//         <Button 
//         type="primary"
//         onClick={toggleCollapsed}
//         >
//             {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
//         </Button>
//         </nav>
//       </Space>
//     </a>
//   </Dropdown>
  

//  );

// }
// make this component available to be imported into any other file






export default Navbar