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
        <div className={styles.groupChat}>
            <div className={styles.rChat}>
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
            </div>

            <div className={styles.sChat}>
                <MessageBox
                    position={'right'}
                    type={'file'}
                    text={'muji.txt'}
                    data={{
                    status: {
                    click: false,
                    loading: 0,
                    },
                    }}
                />
            </div>

            <div className={styles.rChat}>
                <MessageBox
                    position={'left'}
                    type={'audio'}
                    text={'rand.wav'}
                    data={{
                    status: {
                        click: false,
                        loading: 0,
                    },
                    }}
                />

                <MessageBox
                    position={'left'}
                    type={'text'}
                    text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '}
                    data={{
                    status: {
                    click: false,
                    loading: 0,
                    },
                    }}
                />
            </div>

            <div className={styles.sChat}>
                <MessageBox
                    position={'right'}
                    type={'text'}
                    text={'Mattis vulputate enim nulla aliquet. Proin nibh nisl condimentum id venenatis. Enim nulla aliquet porttitor lacus luctus accumsan. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Condimentum id venenatis a condimentum vitae sapien pellentesque. In tellus integer feugiat scelerisque. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Orci a scelerisque purus semper eget duis at tellus. Nullam non nisi est sit. Enim nulla aliquet porttitor lacus. '}
                    data={{
                    status: {
                        click: false,
                        loading: 0,
                    },
                    }}
                />
            </div>
        </div>
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