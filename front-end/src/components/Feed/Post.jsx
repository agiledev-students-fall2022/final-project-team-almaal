import React, { useState, useEffect } from 'react'
import { Avatar } from "@material-ui/core"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Drawer from "react-bottom-drawer";
import './Post.css'
import AddDrawer from './AddDrawer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const URL = process.env.REACT_APP_BACKEND_URL;

let headers = {}
if (localStorage.token) {
    headers = {
        'x-auth-token': localStorage.token
    }
}

function Post({ callback, sid, pid, uid, profilePic, image, username, timestamp, message, likes, comments }) {
    const [comment, setComment] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [flag, setFlag] = useState(likes.includes(sid) ? true : false);
    const [test, setTest] = useState(likes.length)
    const openDrawer = React.useCallback(() => setIsVisible(true), []);
    const closeDrawer = React.useCallback(() => setIsVisible(false), []);
    let render_image;

    useEffect(() => {
        setFlag(likes.includes(sid) ? true : false);
        setTest(likes.length)
    }, [likes])

    const handleSubmit = (e, username) => {
        e.preventDefault();
        if (comment) {
            if (comment === '') {
                return
            }

            axios.post(URL + 'groups/postcomment', { post_id: pid, user_comment: comment }).then(
                setComment(""),
                callback(false)
            )
            // fetch(URL+ 'groups/postcomment', {
            //     method: 'POST',
            //     body: JSON.stringify({post_id: pid, user_comment: comment}), //Backend: usercomment_id: req.session.uid, username: req.session.user, usercomment_pp: ''
            // })
        }
        //db stuff
        // setComment("");
        // callback(false);
    }

    const handleLike = (username, likeflag) => {
        axios.post(URL + 'groups/postLike', { post_id: pid, like: likeflag });
        // fetch(URL+ 'groups/postLike', {
        //     method: 'POST',
        //     body: JSON.stringify({post_id: pid, like: likeflag}),
        //     headers: headers
        // })
    }

    const handleDelete = () => {
        axios.post(URL + 'groups/deletepost', { post_id: pid });
        // fetch(URL+ 'groups/deletepost', {
        //     method: 'POST',
        //     body: JSON.stringify({post_id: pid}),
        //     headers: headers
        // })
    }

    if (image != undefined) {
        const blob = new Blob([Int8Array.from(image.data.data)], { type: image.contentType });
        render_image = window.URL.createObjectURL(blob);
    }

    return (
        <div className='post'>
            <div className="post__top">
                <Avatar src={profilePic} className='post__avatar' />
                <div className='post__topInfo'>
                    <h3>{username}</h3>
                    <p>{timestamp}</p>
                </div>
                {sid == uid &&
                    <DeleteIcon style={{ cursor: 'pointer', display: 'flex', marginLeft: '45%' }} onClick={handleDelete} />
                }
            </div>

            <div className="post__bottom">
                <p>{message}</p>
            </div>

            {image != undefined &&
                <div className="post__image">
                    <img src={render_image} height={250} alt="" />
                </div>
            }

            <div className='like__counter'>
                <ThumbUpIcon style={{ display: 'flex', color: 'blue' }} />
                <p>{test}</p>
            </div>

            <div className="post__options">
                <div onClick={() => { if (flag) { handleLike(username, false); setFlag(false); setTest((test) => (parseInt(test) - 1)); } else { handleLike(username, true); setFlag(true); setTest((test) => (parseInt(test) + 1)); } }} className="post__option">
                    {flag &&
                        <ThumbUpIcon style={{ color: 'red' }} />
                    }
                    {!flag &&
                        <ThumbUpIcon className='likebtn' />
                    }
                    <p>Like</p>
                </div>

                <div onClick={openDrawer} className="post__option">
                    <ChatBubbleOutlineIcon style={{ marginTop: '5px' }} />
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
                        {comments.map((key, i) => (
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
                                    onChange={(e) => setComment(e.target.value)}
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
                        onChange={(e) => setComment(e.target.value)}
                        className='comment_input'
                        placeholder={'Your Thoughts?'}

                    />

                    <button onClick={(e) => { handleSubmit(e, username) }} type="submit">
                        Hidden Submit
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Post