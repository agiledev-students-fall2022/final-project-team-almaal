import React, { useState } from 'react';
import { Drawer, Avatar, Layout, Typography, Input, Card, Button, List, Modal, Divider, Skeleton, Popover } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleOutlined, EllipsisOutlined,  FileImageOutlined, CameraOutlined, PaperClipOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddComponent from './addGroupComponent';
import styles from '../routes/Groups.module.css';

const { Sider } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Meta } = Card;


function groupSettings() {
    return;
}

function find() {
    return;
}

const content = (
    <div style={{ display: 'block' }}>
        <Button style={{ width: '100%' }} type="text">Group Info</Button>
        <br />
        <Button style={{ width: '100%' }} type="text">Remove Group</Button>
    </div>
);

const GroupsSideNavigationBar = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchItem, setItem] = useState('');
    const [showCard, setShowCard] = useState(false);
    return (
        <section className={styles.mainsitelayout}>
        <Sider width={'100%'} className={styles.siteLayoutBackground}>
            <div>
                <Title level={2} className={styles.sideTitle}>Groups</Title>
                <Button className={styles.addbtn} onClick={() => setModal2Open(true)} icon={<PlusCircleOutlined style={{ fontSize: "25px" }} />}></Button>
                <Modal
                    title="Add Groups"
                    centered
                    visible={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                >
                    {[1, 2, 3].map(key => {
                        return (<div key={key}>
                            <AddComponent type="incoming" />
                            <Divider />
                        </div>
                        );
                    })}
                </Modal>
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
                        width: '100%',
                        marginTop: "5%",
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
                    <>
                        
                        <List
                            dataSource={[1, 2, 3, 4, 5]}
                            renderItem={() => (
                                <List.Item >
                                    <Card
                                        hoverable
                                        size='small'
                                        style={{ width: 350, margin:'auto' }}
                                        actions={
                                            [<Popover placement="bottomRight" content={content} trigger="click">
                                                <EllipsisOutlined key="ellipsis" onClick={groupSettings} />
                                            </Popover>]
                                        }
                                    >
                                        <Meta
                                            onClick={() => {
                                                if(window.innerWidth < 600){
                                                     setDrawerOpen(true);
                                                }
                                            }}
                                            avatar={<Avatar src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' />}
                                            title={<a href="./">Group Name</a>}
                                            description='Group Description'
                                        />

                                    </Card>

                                    <Drawer width={'100%'} bodyStyle={{padding:'0'}} title="Group Name" placement="right" onClose={() => setDrawerOpen(false)} open={drawerOpen} style={{height: '100vh'}}>
                                            <section className={styles.dChatSec}>
                                                <h3 style={{textAlign: 'center'}}>Chat Components</h3>
                                            </section>
                                            <Card className={styles.drawerCard}>
                                                <Input id="message"
                                                    style={{
                                                        display: 'inline',
                                                        justifyContent:'left',
                                                        width: '50%'
                                                    }}
                                                    placeholder='Type Message'
                                                />
                                                <Button type="primary" onClick={()=>alert("muji")}>{'>>'}</Button>

                                                <Button type="text" style={{ padding: '0px 10px 0px 10px', }}>
                                                    <FileImageOutlined Popover style={{ fontSize: '23px' }} />
                                                </Button>

                                                <Button type="text" style={{ padding: '0px 10px 0px 0px', }}>
                                                    <PaperClipOutlined Popover style={{ fontSize: '23px' }} />
                                                </Button>

                                                <Button type="text" style={{padding: '0px 0px 0px 0px',}}>
                                                    <CameraOutlined Popover style={{fontSize: '23px'}}/>
                                                </Button> 
                                            </Card>
                                    </Drawer>

                                </List.Item>
                            )}
                        />
                    </>                             
                    </InfiniteScroll>
                </div>
            </>
        </Sider>
        </section>
    )
}

export default GroupsSideNavigationBar