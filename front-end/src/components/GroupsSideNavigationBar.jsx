import React, { useState } from 'react';
import { Avatar, Layout, Typography, Input, Card, Button, List, Modal, Divider, Skeleton, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../routes/Groups.module.css';

const { Sider} = Layout;
const { Title} = Typography;
const { Search } = Input;
const { Meta } = Card;


function groupSettings(){
    return;
}

function find(){
    return;
}

const content = (
    <div style={{display:'block'}}>
      <Button style={{width:'100%'}} type="text">Group Info</Button>
      <br/>
      <Button style={{width:'100%'}} type="text">Remove Group</Button>
    </div>
);

const GroupsSideNavigationBar = () => {
    const [searchItem, setItem] = useState('');
    const [showCard, setShowCard] = useState(false);
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
                onChange={(event) => {
                setItem(event.target.value);
                }}
                onFocus={(event) => setShowCard(true)}
                onBlur={(event) => setShowCard(false)} 
            />    
            {
                searchItem !== '' && showCard && <Card className={styles.card}>
                    {[1, 2, 3].map(key => {
                        return <p key={key}> {searchItem} </p>;
                    })}
                </Card>
            }
            
        </>

        <>
        <div id="scrollableDiv"
            style={{
                width:'100%',
                marginTop:"5%",
                height: "80%",
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
            dataLength={5}
            next={10}
            hasMore={5 < 10}
            loader={
                <Skeleton
                avatar
                paragraph={{
                    rows: 1,
                }}
                active
            />
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
            >
            <List
                dataSource={[1,2,3,4,5]} 
                renderItem={() => (
                <List.Item> 
                <Card
                    hoverable
                    size='small'
                    style={{width:350}}
                    actions={
                    [<Popover placement="bottomRight" content={content} trigger="click">
                        <EllipsisOutlined key="ellipsis" onClick={groupSettings}/>
                    </Popover> ]
                    } 
                >
                    <Meta
                    onClick={()=>alert("Clicked!")}
                    avatar={<Avatar src= 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' />}
                    title={<a href="./">Group Name</a>}
                    description='Group Description'
                    /> 
                </Card>
                </List.Item>
            )}
            />
            </InfiniteScroll>
        </div>
        </>  
    </Sider>
    )
}

export default GroupsSideNavigationBar