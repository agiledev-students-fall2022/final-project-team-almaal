import React, {useState, useEffect} from 'react'
import './Feed.module.css'
import MessageSender from '../components/Feed/MessageSender'
import Post from '../components/Feed/Post'

const URL = "http://localhost:3001/";

function Feed() {
    const [backendData, setBackendData] = useState([{}])
    const [dataFlag, setDataFlag] = useState(false)

    useEffect(()=>{
        fetch(URL + "groups").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
                setDataFlag(true);
            }
        )
    }, [backendData]);


    
  return (

    <div className='feed'>
        <MessageSender 
            session_user = {backendData.session_user}
            callback = {setDataFlag}
        />
        {(typeof(backendData.feed) === 'undefined') ? (
            <p>Loading ...</p>
        ): (
        
            backendData.feed.map((key, i)=>(
            <Post 
                callback = {setDataFlag}
                sid = {backendData.session_user.user_id}
                pid = {key._id}
                uid = {key.user_id}
                profilePic = {key.profilePic}
                message = {key.post_text}
                timestamp = {key.timestamp}
                username = {key.username}
                image = {key.post_img}
                likes = {key.likes}
                comments = {key.comments}
            />           
        ))
    )}
    </div>
  )
}

export default Feed