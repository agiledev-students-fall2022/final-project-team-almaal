import React, { useState } from 'react';
import "antd/dist/antd.css";
import { Avatar, Layout, Typography, Input, Card, Button, List, Modal, Divider, Skeleton, Popover } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../routes/Groups.module.css';

const { Sider} = Layout;
const { Title} = Typography;
const { Search } = Input;
const { Meta } = Card;


function find(){
    return;
}


const GroupsSideNavigationBar = () => {
    return (
    <Sider width={'26%'} className={styles.siteLayoutBackground}> 
        
        <div>
        <Title level={2} className={styles.sideTitle}>Groups</Title>  
        </div> 
        
        <>
        <Search
            className={styles.sideSearchBar}
            placeholder="Search Groups"
            allowClear
            onSearch={find}
        />
        </>
    </Sider>
    )
}

export default GroupsSideNavigationBar