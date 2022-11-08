import React, {useState} from 'react'
import './AddDrawer.css'
import {Avatar} from "@material-ui/core"

function AddDrawer() {
  return (
    <div className="drawer-content">
        <div className="drawerpost__comment">
            <Avatar className='profile__img'/>
            <div className="profile__comment" >
                <h3 className='profile__name'>{'username'}</h3>
                <p className='comment__label'>{'comment'}</p>
            </div>
        </div>
    </div>
  )
}

export default AddDrawer