import React, { useState } from 'react'
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

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
                <FriendsModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />

            </section>
            <section className={styles.container}>
                <Title level={3} className={styles.title}>Incoming Requests</Title>
                {[1, 2, 3].map(key => {
                    return (<div key={key}>
                        <IncomingRequest type="incoming" />
                        <Divider />
                    </div>
                    );
                })}
                <Button type="default" className={styles.seemore}>See More</Button>
            </section>
        </>
    )
}

export default Friends