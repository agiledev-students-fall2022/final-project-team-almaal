import React from 'react';
import "antd/dist/antd.css";
import {Avatar, Layout, Input, Card, Button, Upload } from 'antd';
import { FileImageOutlined, CameraOutlined, PaperClipOutlined } from '@ant-design/icons';
import styles from '../routes/Groups.module.css';
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements'

const { Header, Content,Footer } = Layout;
const { Meta } = Card;


const ChatComponent = () => {
  return (
    <Layout className={styles.chatLayout}>
      <Header style={{background:'red' , width:'100%', padding: '1px', height: '10%'}}>
        <Card  size='small' className={styles.userCard}>
          
       </Card>
      </Header>
      
      <Content className={styles.chatContent}>
      
      {/* <div className={styles.rChat}>
          <MessageBox
            title={'User'}
            position={'left'}
            type={'photo'}
            text={'hello.png'}
            data={{
              uri: 'https://facebook.github.io/react/img/logo.svg',
              status: {
                click: false,
                loading: 0,
              },
            }}
          />
          <MessageBox
            position={'left'}
            type={'text'}
            text={'Hello World!'}
            data={{
              status: {
                click: false,
                loading: 0,
              },
            }}
          />
        </div> */}
      </Content>

      <Footer style={{background:'red' , width:'100%', padding: '1px', height: '10%'}}>        
          
      </Footer>
    </Layout>
  )
}

export default ChatComponent