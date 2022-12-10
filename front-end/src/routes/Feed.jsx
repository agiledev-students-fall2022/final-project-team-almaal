import React, { useState, useEffect } from 'react'
import './Feed.module.css'
import MessageSender from '../components/Feed/MessageSender'
import Post from '../components/Feed/Post'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios';

const URL = process.env.REACT_APP_BACKEND_URL;

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
    const [runFlag, setRunFlag] = useState(false)

    useEffect(() => {
       setInterval(()=>{
            axios.get(URL + "groups").then(
                function (response) {
                    setBackendData(response.data);
                    if ((response.data.feed).length > backendData.length) {
                        setRunFlag(true);
                    }
                }
            )
       }, 10000) 
    }, []);


    if (runFlag) {
        return (

            <div className='feed'>
                <MessageSender
                    session_user={backendData.session_user}
                    callback={setDataFlag}
                />
                {(typeof (backendData.feed) === 'undefined') ? (
                    <p>Loading ...</p>
                ) : (

                    backendData.feed.map((key, i) => (
                        <Post
                            callback={setDataFlag}
                            sid={backendData.session_user.user_id}
                            pid={key._id}
                            uid={key.user_id}
                            profilePic={key.profilePic}
                            message={key.post_text}
                            timestamp={key.timestamp}
                            username={key.username}
                            image={key.post_img}
                            likes={key.likes}
                            comments={key.comments}
                        />
                    ))
                )}
            </div>
        )
    }
}

export default Feed