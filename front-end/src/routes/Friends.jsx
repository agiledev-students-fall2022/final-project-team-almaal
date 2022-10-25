import React, { useState, useEffect } from 'react'
import styles from './Friends.module.css'

import { Input, Space, Card, Col, Row, Image, Divider, Button } from 'antd';
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons"
import IncomingRequest from '../components/IncomingRequest';
import FriendsModal from '../components/FriendsModal';
import { Typography } from 'antd'
const { Title } = Typography


const { Search } = Input;



const Friends = () => {
    const [searchItem, setItem] = useState('');
    const [showCard, setShowCard] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [incomingRequests, setIncomingRequests] = useState([]);
    const [friends, setFriends] = useState([]);

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
        const getUsers = async () => {
            const response = await fetch("https://dummyapi.io/data/v1/user?limit=5", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "app-id": "6357430507c41c1c4cf1a09b"
                }
            })
            const data = await response.json();
            setIncomingRequests(data.data);
            setFriends(data.data);
        }

        getUsers();
    }, []);

    return (
        <>
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
                <div className={styles.friendsLink} onClick={showModal}>All Friends (19)</div>
                <FriendsModal friends={friends} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />

            </section>
            <section className={styles.container}>
                <Title level={3} className={styles.title}>Incoming Requests</Title>
                {incomingRequests.map(friend => {
                    return (<div key={friend.id}>
                        <IncomingRequest request={friend} type="incoming" />
                        <Divider />
                    </div>
                    );
                })}
                {incomingRequests.length > 3 && <Button type="default" className={styles.seemore}>See More</Button>}
                {incomingRequests.length <= 3 && <p style={{ color: "grey" }}>No incoming requests</p>}
                <div className="spacer" style={{ height: "6rem" }}></div>
            </section>
        </>
    )
}

export default Friends