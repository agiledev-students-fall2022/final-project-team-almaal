import React, { useState } from 'react'
import styles from '../routes/Friends.module.css'
import IncomingRequest from './IncomingRequest';

import { Button, Modal, Typography, Divider } from 'antd';
const { Title } = Typography

const FriendsModal = ({ friends, isModalOpen, handleOk, handleCancel }) => {
    return (
        <>
            <Modal title="All Friends (19)" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={""}>
                {friends.map(friend => {
                    return (<div key={friend.id}>
                        <IncomingRequest request={friend} type="view" />
                        <Divider />
                    </div>
                    );
                })}
                <Button type="default" className={styles.seemore}>See More</Button>
            </Modal>
        </>
    );
};
export default FriendsModal