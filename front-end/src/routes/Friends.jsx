import React, { useState, useEffect } from 'react'
import styles from './Friends.module.css'
import { useHistory } from 'react-router-dom';

import axios from 'axios'

import { Input, Space, Card, Col, Row, Image, Divider, Button, notification } from 'antd';
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons"
import IncomingRequest from '../components/IncomingRequest';
import FriendsModal from '../components/FriendsModal';
import { Typography } from 'antd'
const { Title } = Typography
const { Search } = Input;

const Context = React.createContext({ name: 'Default' });

const URL = process.env.REACT_APP_BACKEND_URL

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
        console.log(friend, friends)
        if (type === "friendRemove") {
            setFriends(friends.filter(entry => entry._id !== friend._id))
            openNotification("topLeft", "Friend Removed")
        }
        if (type === "accept" || type === "delete") setIncomingRequests(incomingRequests.filter(request => request._id !== friend._id))

        if (type === "accept") {
            axios.post(URL + "friends/modifyrequest", {
                action: type,
                sender: friend._id
            }).then(res => res.data)
                .then(res => {
                    openNotification("topLeft", res.message)
                })
                .catch(err => openNotification("topLeft", err.response.data.message))

        } else if (type === "delete") {
            axios.post(URL + "friends/modifyrequest", { action: type, sender: friend._id })
                .then(res => res.data)
                .then(res => openNotification("topLeft", res.message))
                .catch(err => openNotification("topLeft", err.response.data.message))


        } else if (type === "send") {
            // setShowCard(false);
            axios.post(URL + "friends/sendrequest", { searchId: friend._id })
                .then(res => res.data)
                .then(res => openNotification("topLeft", res.message))
                .catch(err => openNotification("topLeft", err.response.data.message))
        }
    }

    const searchFriend = (value) => {
        setLoaderBool(true);
        axios.post(URL + "friends/search", { searchId: value })
            .then(res => res.data)
            .then(data => {
                setLoaderBool(false);

                setItem(data);
                setShowCard(true);
            }).catch(err => {
                setLoaderBool(false)

                setItem(err.response.data)
                setShowCard(true)
            })
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
            const response = await axios.get(URL + "friends")
            const data = response.data;

            setIncomingRequests(data.friendRequests);
        }

        const getFriendList = async () => {
            const response = await axios.get(URL + "friends/friendlist")
            const data = response.data;
            setFriends(data.friends);
        }

        getIncomingRequests();
        getFriendList();

    }, []);

    axios.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
            window.location.replace("/")
        }
        throw error;
    })

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
                        //     
                        //     setShowCard(false);
                        // }}
                        />
                        {
                            searchItem !== '' && showCard && <Card className={styles.card}>
                                <>
                                    {searchItem.success === false ? <p>{searchItem.message}</p> :
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