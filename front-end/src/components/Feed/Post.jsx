import React, {useState, useEffect} from 'react'
import {Avatar} from "@material-ui/core"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Drawer from "react-bottom-drawer";
import './Post.css'
import AddDrawer from './AddDrawer';

const URL = "http://localhost:3001/";

function Post({profilePic, image, username, timestamp, message, likes, comments}) {
    const [comment, setComment] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const openDrawer = React.useCallback(() => setIsVisible(true), []);
    const closeDrawer = React.useCallback(() => setIsVisible(false), []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(comment){            
            if(comment === ''){
                return
            }

            fetch(URL+ 'groups/postcomment', {
                method: 'POST',
                body: comment
            })
        }
          //db stuff
        setComment("");
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

        <div className="post__image">
            <img src={image} height={250} alt=""/>
        </div>

        <div className='like__counter'>
            <ThumbUpIcon style={{display:'flex', color:'blue'}}/>
            <p>{likes}</p>
        </div>

        <div className="post__options">
            <div className="post__option">
                <ThumbUpIcon className='likebtn'/>
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
                
                <button onClick={handleSubmit} type="submit">
                    Hidden Submit
                </button>

            </form>
        </div>
    </div>
  )
}

export default Post