import React, { useState } from 'react'
import styles from '../routes/Friends.module.css'
import IncomingRequest from './IncomingRequest';

import { Button, Modal, Typography, Divider } from 'antd';
const { Title } = Typography

const FriendsModal = ({ isModalOpen, handleOk, handleCancel }) => {
    return (
        <>
            <Modal title="All Friends (19)" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={""}>
                {[1, 2, 3].map(key => {
                    return (<div key={key}>
                        <IncomingRequest type="view" />
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