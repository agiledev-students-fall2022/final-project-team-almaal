import React, { useState } from 'react'
import { Typography, Space, Divider, Avatar, Button, Input, Switch, Card, List, Tooltip, Col, Row } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Profile.module.css'

const { Title } = Typography;

const Profile = ({ total_friends = 0, total_groups = 0, total_investment = 0, total_pl = 0 }) => {
    const [username, setUsername] = useState('');
    const [allowUsernameEdit, setAllowUsernameEdit] = useState('false');
    const [allowPasswordEdit, setAllowPasswordEdit] = useState('false');

    const handleUsernameButton = () => {
        setAllowUsernameEdit(~allowUsernameEdit);
    }

    const handlePasswordButton = () => {
        setAllowPasswordEdit(~allowPasswordEdit);
    }

    return (
        <div>
            {/* <Title level={2} className={styles.title}>Your Almaal Profile</Title> */}
            <Space className={styles.container} direction="vertical" size="large" align="center" style={{ display: 'flex' }}>
                <Avatar className={styles.profilePic} size={96} icon={<UserOutlined />} />
                <Space align="center">
                    <Space direction="vertical">
                        <Typography className={styles.inputLabel}>Username</Typography>
                        <Typography className={styles.inputLabel}>Password</Typography>
                    </Space>
                    <Space direction="vertical">
                        <Space className={styles.input}>
                            <Input defaultValue="current_username" disabled={allowUsernameEdit} size="large" />
                            <Tooltip>
                                <Button icon={<EditOutlined />} onClick={handleUsernameButton} />
                            </Tooltip>
                        </Space>
                        <Space className={styles.input}>
                            <Input defaultValue="current_password" disabled={allowPasswordEdit} size="large" />
                            <Tooltip>
                                <Button icon={<EditOutlined />} onClick={handlePasswordButton} />
                            </Tooltip>
                        </Space>
                    </Space>
                </Space>
                <Space direction="vertical" className={styles.switchContainer}>
                    <Space size="small">Investment Visibility<Switch className={styles.switch} defaultChecked ></Switch></Space>
                    <Space size="small">Hide Profile<Switch className={styles.switch}></Switch></Space>
                </Space>
                <Divider plain></Divider>
                {/* <List className='cards'>
                    <Space>
                        <Card size="small" title="Total Friends">{total_friends}</Card>
                        <Card size="small" title="Total Groups">{total_groups}</Card>
                    </Space>
                    <Space>
                        <Card size="small" title="Total Investment">{total_investment}</Card>
                        <Card size="small" title="Total P/L">{total_pl}</Card>
                    </Space>
                </List> */}
                <Row justify="space-around" gutter={[16, 16]}>
                    <Col md={12} xl={6}>
                        <Card style={{ Width: "50%" }} title="Total Friends">{total_friends}</Card>
                    </Col>
                    <Col md={12} xl={6}>
                        <Card style={{ Width: "50%" }} title="Total Groups">{total_groups}</Card>
                    </Col>
                    <Col md={12} xl={6}>
                        <Card style={{ Width: "50%" }} title="Total Investment">{total_investment}</Card>
                    </Col>
                    <Col md={12} xl={6}>
                        <Card style={{ Width: "50%" }} title="Total P/L">{total_pl}</Card>
                    </Col>
                </Row>
            </Space>
        </div>
    );

}
export default Profile