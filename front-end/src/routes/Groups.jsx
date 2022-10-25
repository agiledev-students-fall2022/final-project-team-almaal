import React from 'react'
import { Layout } from 'antd'
import styles from './Groups.module.css'
import GroupsSideNavigationBar from '../components/GroupsSideNavigationBar';
import ChatComponent from '../components/ChatComponent';


const Groups = () => {

  return (
    <Layout className={styles.mainLayout}>
      <GroupsSideNavigationBar />
      <ChatComponent />
    </Layout>
  )
}

export default Groups