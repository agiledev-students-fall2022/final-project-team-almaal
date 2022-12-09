import React, { useState } from 'react'
import './MessageSender.css'
import { Avatar } from "@material-ui/core"
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import axios from 'axios';
const URL = process.env.REACT_APP_BACKEND_URL;

let headers = {}
if (localStorage.token) {
    headers = {
        'x-auth-token': localStorage.token
    }
}

function MessageSender({ session_user, callback }) {
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);
    const [randfile, setfile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (input) {
            const formData = new FormData();
            if (image) {
                formData.append('post_text', input);
                formData.append('post_img', randfile, randfile.name);
            } else {
                formData.append('post_text', input);
            }

            axios.post(URL + 'groups/feedpost', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then(
                console.log("REQ SENT"),
                setImage(null),
                setInput(""),
                callback(false)
            )
            // fetch(URL+'groups/feedpost', {
            //     method: 'POST',
            //     body: formData,
            //     headers: headers
            // })
        }
        //db stuff
    };

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        setfile(file);
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
        }

        reader.onload = (readerEvent) => {
            setImage(readerEvent.target.result);
        };
    }

    const removeImage = () => {
        setImage(null);
    }

    return (
        <div className='messageSender'>
            <div className="messageSender__top">
                <Avatar src={session_user != undefined ? session_user.user_pp : null} />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='messageSender__input'
                        placeholder={'Any Investment Insights?'}

                    />

                    <button onClick={handleSubmit} type="submit">
                        Hidden Submit
                    </button>

                </form>

                {image &&
                    <div onClick={removeImage} style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                        <img width={50} height={50} className='messageSender__img' src={image} alt=''></img>
                        <p style={{ fontSize: 'small', color: 'orange', textAlign: 'center' }}>Remove</p>
                    </div>
                }

            </div>

            <div className="messageSender__bottom">
                <label for='file-upload' className="messageSender__option">
                    <PhotoLibraryIcon style={{ color: 'green' }} />
                    <h3>Photo/Video</h3>
                </label>
                <input id='file-upload' type='file' style={{ display: 'none' }} onChange={uploadHandler} />
            </div>
        </div>
    )
}

export default MessageSender