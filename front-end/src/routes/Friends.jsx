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
    const [loaderBool, setLoaderBool] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [incomingRequests, setIncomingRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement, message_desc) => {
        api.info({
            message: `Notification`,
            description: <Context.Consumer>{({ name }) => `${message_desc}!`}</Context.Consumer>,
            placement,
        });
    };

    const handleRemove = (type, friend) => {
        if (type !== "send") setIncomingRequests(incomingRequests.filter(request => request.login.uuid !== friend.login.uuid))

        if (type === "accept") {
            fetch(URL + "friends/modifyrequest", {
                method: 'POST',
                body: JSON.stringify({ action: type }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    openNotification("topLeft", res.message)
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
                .then(res => openNotification("topLeft", res.message))

            console.log(type)
        } else if (type === "send") {
            // setShowCard(false);
            console.log("Request gdfsdf")
            fetch(URL + "friends/sendrequest", {
                method: 'POST',
                body: JSON.stringify({ handle: friend }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => openNotification("topLeft", res.message))
        }
    }

    const searchFriend = (value) => {
        setLoaderBool(true);
        fetch(URL + "friends/search", {
            method: 'POST',
            body: JSON.stringify({ handle: value }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setLoaderBool(false);
                console.log(data)
                setItem(data);
                setShowCard(true);
            });
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
                        <Search className={styles.search} enterButton="Search" size="large" placeholder="Search for a friend..." loading={loaderBool}
                            onChange={(event) => {
                                setShowCard(false);
                            }}
                            onSearch={((value, event) => {
                                searchFriend(value);
                            })}
                        // onFocus={(event) => setShowCard(true)}
                        // onBlur={(event) => {
                        //     console.log(event.target);
                        //     setShowCard(false);
                        // }}
                        />
                        {
                            searchItem !== '' && showCard && <Card className={styles.card}>
                                <>
                                    {searchItem.found === false ? <p>{searchItem.message}</p> :
                                        <IncomingRequest request={searchItem.profile} type="search" handleRemove={handleRemove} />}
                                </>

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