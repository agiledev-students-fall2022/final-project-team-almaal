import React, { useState } from 'react'
import { Typography, Space, Divider, Avatar, Button, Input, Switch, Card, List, Tooltip, Col, Row } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Profile.module.css'
import { useEffect } from 'react'
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import fetcher from '../utils/setFetchToken';

const { Title } = Typography;

const URL = process.env.REACT_APP_BACKEND_URL;

let headers = {}
if (localStorage.token) {
    headers = {
        'x-auth-token': localStorage.token
    }
    setAuthToken(localStorage.token);
}

const Profile = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [picture, setPicture] = useState(null);
    const [investmentVisibility, setInvestmentVisibility] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState(false);
    const [totalFriends, setTotalFriends] = useState();
    const [totalInvestment, setTotalInvestment] = useState();
    const [totalPl, setTotalPl] = useState();
    const [allowEdit, setAllowEdit] = useState(false);
    const [allowUsernameEdit, setAllowUsernameEdit] = useState(false);

    const updateInformation = data => {
        setUsername(data.login.username)
        setPassword(data.login.password)
        setPicture(data.picture.thumbnail)
        setInvestmentVisibility(data.investment_visibility)
        setProfileVisibility(data.profile_visibility)
        setTotalFriends(data.friends.length)
        setTotalInvestment(data.total_invested)
        setTotalPl(data.total_profit)
    }

    const updateUsername = () =>{
        if(document.getElementById('exampleInputEmail1').value != ""){
            setUsername(document.getElementById('exampleInputEmail1').value)
        }
    }

    const handleEditButton = async () => {
        setAllowEdit(!allowEdit);
        // 
        if(allowEdit){
            // setUsername(document.getElementById('exampleInputEmail1').value)
            updateUsername()
            
            
            axios.post(URL + "profile/update", 
                {   username: username,
                    investment_visibility: investmentVisibility,
                    profile_visibility: profileVisibility
                })
                .then(() => {
                    
                    
                    
                    
                })
                .catch(err => {
                    
                })
        }
    }

    // const handleUsernameButton = () => {
    //     setAllowUsernameEdit(!allowUsernameEdit);
    //     if (!allowUsernameEdit) {
    //         setUsername(document.getElementById('exampleInputEmail1').value)
    //         axios.post(URL + "profile/update", { username: username })
    //             .then(() => {
    //                 
    //             })
    //             .catch(err => {
    //                 
    //             })
    //     }

    // }

    // const handlePasswordButton = () => {
    //     setAllowPasswordEdit(!allowPasswordEdit);
    //     if (!allowPasswordEdit) {
    //         setPassword(document.getElementById('exampleInputPassword1').value)
    //         axios.post(URL + "profile/update", { password: password })
    //             .then(() => {
    //                 
    //             })
    //             .catch(err => {
    //                 
    //             })
    //     }
    // }

    const handleUsernameButton = () => {
        updateUsername()
    }

    const handleInvestmentSwitch = () => {
        setInvestmentVisibility(!investmentVisibility);
        
        // axios.post(URL + "profile/update", { investment_visibility: investmentVisibility })
        //     .then(() => {
        //         
        //     })
        //     .catch(err => {
        //         
        //     })
        // fetch(URL + 'profile/update', {
        //     method:'POST',
        //     body: JSON.stringify({investment_visibility: investmentVisibility})
        // })
    }

    const handleProfileSwitch = () => {
        setProfileVisibility(!profileVisibility);
        
        // axios.post(URL + "profile/update", { profile_visibility: profileVisibility })
        //     .then(() => {
        //         
        //     })
        //     .catch(err => {
        //         
        //     })
    }

    useEffect(() => {
        const getProfile = () => {
            axios.get(URL + "profile").then(
                function (response) {
                    updateInformation(response.data)
                }
            )
            // const response = await fetcher(URL + "profile", {headers})
            // const data = await response.json();
            // 
            // updateInformation(data)
            
        }

        getProfile();
        
    }, [])
    
        
        
        
    return (
        <div>
            {/* <Title level={2} className={styles.title}>Your Almaal Profile</Title> */}
            <Space className={styles.container} direction="vertical" size="large" align="center" style={{ display: 'flex' }}>
                <Avatar className={styles.profilePic} size={96} src={picture} icon={<UserOutlined />} />
                <Space align="center">
                    <Space direction="vertical">
                        <Typography className={styles.inputLabel}>Username</Typography>
                        {/* <Typography className={styles.inputLabel}>Password</Typography> */}
                    </Space>
                    <Space direction="vertical">
                        <Space className={styles.input}>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled={!allowEdit} placeholder={username} />
                            <Tooltip>
                                <Button icon={<EditOutlined />} onClick={handleUsernameButton} disabled={!allowEdit}/>
                            </Tooltip>
                        </Space>
                        {/* <Space className={styles.input}>
                            <input type="password" className="form-control" id="exampleInputPassword1" disabled={allowPasswordEdit} placeholder={password} />
                            <Tooltip>
                                <Button icon={<EditOutlined />} onClick={handlePasswordButton} />
                            </Tooltip>
                        </Space> */}
                    </Space>
                </Space>
                <Space direction="vertical" className={styles.switchContainer}>
                    <Space size="small">Investment Visibility<Switch className={styles.switch} disabled={!allowEdit} checked={investmentVisibility} onClick={handleInvestmentSwitch}></Switch></Space>
                    <Space size="small">Hide Profile<Switch className={styles.switch} disabled={!allowEdit} checked={profileVisibility} onClick={handleProfileSwitch}></Switch></Space>
                </Space>
                <Button type="primary" onClick={handleEditButton} >Edit</Button>
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
                        <Card style={{ Width: "50%" }} title="Total Friends">{totalFriends}</Card>
                    </Col>
                    {/* <Col md={12} xl={6}>
                        <Card style={{ Width: "50%" }} title="Total Feeds">{totalGroups}</Card>
                    </Col> */}
                    <Col md={12} xl={6}>
                        <Card style={{ Width: "50%" }} title="Total Investment">{totalInvestment}</Card>
                    </Col>
                    <Col md={12} xl={6}>
                        <Card style={{ Width: "50%" }} title="Total P/L">{totalPl}</Card>
                    </Col>
                </Row>
            </Space>
        </div>
    )

}
export default Profile