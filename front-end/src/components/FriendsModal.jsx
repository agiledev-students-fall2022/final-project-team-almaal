import React, { useState } from 'react'
import styles from '../routes/Friends.module.css'
import IncomingRequest from './IncomingRequest';

import { Button, Modal, Typography, Divider } from 'antd';
const { Title } = Typography

const FriendsModal = ({ friends, isModalOpen, handleOk, handleCancel, handleRemove }) => {

    return (
        <>
            <Modal title="All Friends" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={""}>
                {friends.map(friend => {
                    return (<div key={friend.login.uuid}>
                        <IncomingRequest request={friend} type="view" handleRemove={handleRemove} />
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