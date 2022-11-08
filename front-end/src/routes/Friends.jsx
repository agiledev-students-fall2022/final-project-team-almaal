import React, { useState, useEffect } from 'react'
import styles from './Friends.module.css'

import { Input, Space, Card, Col, Row, Image, Divider, Button, notification } from 'antd';
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons"
import IncomingRequest from '../components/IncomingRequest';
import FriendsModal from '../components/FriendsModal';
import { Typography } from 'antd'
const { Title } = Typography
const { Search } = Input;

const Context = React.createContext({ name: 'Default' });

const URL = "http://localhost:3001/"

const Friends = () => {
    const [searchItem, setItem] = useState('');
    const [showCard, setShowCard] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [incomingRequests, setIncomingRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.info({
            message: `Notification ${placement}`,
            description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
            placement,
        });
    };

    const handleRemove = (type, friend) => {
        setIncomingRequests(incomingRequests.filter(request => request.login.uuid !== friend.login.uuid))

        if (type === "accept") {
            fetch(URL + "friends/modifyrequest", {
                method: 'POST',
                body: JSON.stringify({ action: type }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    openNotification()
                })

            console.log(type)
        } else if (type === "delete") {
            fetch(URL + "friends/modifyrequest", {
                method: 'POST',
                body: JSON.stringify({ action: type }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => console.log(res))

            console.log(type)
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getIncomingRequests = async () => {
            const response = await fetch("http://localhost:3001/friends", {
                method: "GET"
            })
            const data = await response.json();

            setIncomingRequests(data.friendRequests);
        }

        const getFriendList = async () => {
            const response = await fetch("http://localhost:3001/friends/friendlist", {
                method: "GET"
            })
            const data = await response.json();
            setFriends(data.friends);
        }

        getIncomingRequests();
        getFriendList();

    }, []);

    return (
        <>
            <Context.Provider value={{ name: 'Ant Design' }}>
                {contextHolder}
                <section className={styles.container}>
                    <Title level={3} className={styles.title}>Add a Friend</Title>
                    <div className={styles.searchArea}>
                        <Search className={styles.search} placeholder="Search for a friend..."
                            onChange={(event) => {
                                setItem(event.target.value);
                            }}
                            onFocus={(event) => setShowCard(true)}
                            onBlur={(event) => setShowCard(false)} />
                        {
                            searchItem !== '' && showCard && <Card className={styles.card}>
                                {[1, 2, 3].map(key => {
                                    return <p key={key}> {searchItem} </p>;
                                })}
                            </Card>
                        }
                    </div>
                    <div className={styles.friendsLink} onClick={showModal}>All Friends</div>
                    <FriendsModal friends={friends} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} handleRemove={handleRemove} />

                </section>
                <section className={styles.container}>
                    <Title level={3} className={styles.title}>Incoming Requests</Title>
                    {incomingRequests.map(friend => {
                        return (<div key={friend.login.uuid}>
                            <IncomingRequest request={friend} type="incoming" handleRemove={handleRemove} />
                            <Divider />
                        </div>
                        );
                    })}
                    {incomingRequests.length > 3 && <Button type="default" className={styles.seemore}>See More</Button>}
                    {incomingRequests.length === 0 && <p style={{ color: "grey" }}>No incoming requests</p>}

                </section>
            </Context.Provider>
        </>
    )
}

export default Friends