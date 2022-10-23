import React from 'react'
import {Avatar, Layout, Input, Card, Button, Upload } from 'antd'
import { FileImageOutlined, CameraOutlined, PaperClipOutlined } from '@ant-design/icons';
import styles from '../routes/Groups.module.css'
import 'react-chat-elements/dist/main.css'
import { MessageBox } from 'react-chat-elements'


const { Header, Content,Footer } = Layout;
const { Meta } = Card;


function sendMessage(){
  return;
}


const ChatComponent = () => {
  return (
    <Layout className={styles.chatLayout}>
      <Header style={{ width:'100%', padding: '1px', height: '10%'}}>
        <Card  size='small' className={styles.userCard}>
           <Meta
            avatar={<Avatar src= 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' />}
            title='Group Name'
            description='Active 45m ago'
          />
       </Card>
      </Header>
      
      <Content className={styles.chatContent}>
      
    
      </Content>

      <Footer style={{ width:'100%', padding: '1px', height: '10%'}}>        
        <Card
          size='small'
          style={{display: 'grid', width: '100%', background:'#ededed', justifyContent: 'left', marginTop: 3}}
        >

        <Input id="message"
          style={{
            width: '800px'
          }}
          placeholder = 'Type Message'
        />
        <Button type="primary" onClick={sendMessage}>{'>>'}</Button>
        
        <Button type="text"  style={{padding: '0px 50px 0px 30px',}}>
          <FileImageOutlined Popover style={{fontSize: '23px'}}/>
        </Button>

        <Button type="text"  style={{padding: '0px 50px 0px 0px',}}>
          <CameraOutlined Popover style={{fontSize: '23px'}}/>
        </Button> 

        <Upload style={{padding: '0px 50px 0px 0px'}}>
          <Button type="text" icon={<PaperClipOutlined style={{fontSize: '23px'}}/>}></Button>
        </Upload>
        
         {/* <Button type="text" style={{padding: '0px 50px 0px 0px',}}>
          <PaperClipOutlined Popover style={{fontSize: '23px'}}/>
        </Button>          */}
          
        </Card>
      </Footer>
    </Layout>
  )
}

export default ChatComponent