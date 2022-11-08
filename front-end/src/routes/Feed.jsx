import React from 'react'
import './Feed.module.css'
import MessageSender from '../components/Feed/MessageSender'
import Post from '../components/Feed/Post'

function Feed() {
  return (
    <div className='outer'>
        <div className='feed'>
            <MessageSender />
            {/* {(typeof(backendData.feed) === 'undefined') ? (
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
                    // profilePic = {key.profilePic}
                    // message = {key.message}
                    // timestamp = {key.timestamp}
                    // username = {key.username}
                    // image = {key.image}
                />           
            ))
            )} */}

            <Post />
            <Post />
            <Post />
        </div>
    </div>
  )
}

export default Feed