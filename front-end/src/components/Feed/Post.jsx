import React, {useState, useEffect} from 'react'
import {Avatar} from "@material-ui/core"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Drawer from "react-bottom-drawer";
import './Post.css'
import AddDrawer from './AddDrawer';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:3001/";

function Post({profilePic, image, username, timestamp, message, likes, comments}) {
    const [comment, setComment] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [flag, setFlag] = useState(false);
    const [test, setTest] = useState(likes)
    const openDrawer = React.useCallback(() => setIsVisible(true), []);
    const closeDrawer = React.useCallback(() => setIsVisible(false), []);

    const handleSubmit = (e, username) =>{
        e.preventDefault();
        if(comment){            
            if(comment === ''){
                return
            }

            fetch(URL+ 'groups/postcomment', {
                method: 'POST',
                body: JSON.stringify({userPost: username, user: 'User0', user_comment: comment})
            })
        }
          //db stuff
        setComment("");
    }

    const handleLike = (username, likeflag) =>{
        fetch(URL+ 'groups/postLike', {
            method: 'POST',
            body: JSON.stringify({userPost: username, like: likeflag})
        })
    }

  return (
    <div className='post'>
        <div className="post__top">
            <Avatar src={profilePic} className='post__avatar'/>
            <div className='post__topInfo'>
                <h3>{username}</h3>
                <p>{timestamp}</p>
            </div>
        </div>

        <div className="post__bottom">
            <p>{message}</p>
        </div>

        {image != null &&
            <div className="post__image">
                <img src={image} height={250} alt=""/>
            </div>
        }

        <div className='like__counter'>
            <ThumbUpIcon style={{display:'flex', color:'blue'}}/>
            <p>{test}</p>
        </div>

        <div className="post__options">
            <div onClick={()=>{if(flag){handleLike(username, false); setFlag(false); setTest((test) => (parseInt(test) - 1));}else{handleLike(username, true); setFlag(true); setTest((test) => (parseInt(test) + 1));}}} className="post__option">
                {flag &&
                    <ThumbUpIcon style={{color:'red'}}/>
                }
                {!flag &&
                    <ThumbUpIcon className='likebtn'/>
                }
                <p>Like</p>
            </div>

            <div onClick={ openDrawer} className="post__option">
                <ChatBubbleOutlineIcon style={{marginTop:'5px'}}/>
                <p>Comment</p>
            </div>
            <Drawer 
                className='drawer'
                duration={250}
                hideScrollbars={true}
                onClose={closeDrawer}
                isVisible={isVisible}
            >
               <div>
                    {comments.map((key,i) => (
                        <AddDrawer 
                            username={key.username}
                            profilePic={key.profilePic}
                            comment={key.comment}
                        />
                    ))}

                    <div className='drawer_comment'>        
                        <Avatar />
                        <form>
                            <input 
                                value={comment}
                                onChange={(e)=> setComment(e.target.value)}
                                className='comment_input' 
                                placeholder={'Your Thoughts?'}

                            />
                            
                            <button onClick={handleSubmit} type="submit">
                                Hidden Submit
                            </button>

                        </form>
                    </div>
               </div>
            </Drawer>
        </div>

        <div className='post__comment'>
            <Avatar />
            <form>
                <input 
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    className='comment_input' 
                    placeholder={'Your Thoughts?'}

                />
                
                <button onClick={(e) => {handleSubmit(e, username)}} type="submit">
                    Hidden Submit
                </button>

            </form>
        </div>
    </div>
  )
}

export default Post