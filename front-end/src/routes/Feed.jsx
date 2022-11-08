import React, {useState, useEffect} from 'react'
import './Feed.module.css'
import MessageSender from '../components/Feed/MessageSender'
import Post from '../components/Feed/Post'

const URL = "http://localhost:3001/";

function Feed() {
    const [backendData, setBackendData] = useState([{}])

    useEffect(()=>{
        fetch(URL + "groups").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
            }
        )
    }, []);


    
  return (

    <div className='feed'>
        <MessageSender />
        {(typeof(backendData.feed) === 'undefined') ? (
            <p>Loading ...</p>
        ): (
        
            backendData.feed.map((key, i)=>(
            <Post 
                profilePic = {key.profilePic}
                message = {key.message}
                timestamp = {key.timestamp}
                username = {key.username}
                image = {key.image}
                likes = {key.likes}
                comments = {key.comments}
            />           
        ))
    )}
    </div>
  )
}

export default Feed