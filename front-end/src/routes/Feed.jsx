import React, {useState, useEffect} from 'react'
import './Feed.module.css'
import MessageSender from '../components/Feed/MessageSender'
import Post from '../components/Feed/Post'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios';

const URL = "http://localhost:3001/";

let headers = {}
if (localStorage.token) {
    headers = {
        'x-auth-token': localStorage.token
    }
    setAuthToken(localStorage.token);
}

function Feed() {
    const [backendData, setBackendData] = useState([{}])
    const [dataFlag, setDataFlag] = useState(false)

    useEffect(()=>{
        axios.get(URL + "groups").then(
           function(response){
                setBackendData(response.data);
                setDataFlag(true);
            
        })
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