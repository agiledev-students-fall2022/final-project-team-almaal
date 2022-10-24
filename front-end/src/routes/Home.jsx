import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import {Tabs } from 'antd';
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import './Home.css'



const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')



  const [mode, setMode] = useState('top');
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
            <Avatar size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                    }} 
                icon={<UserOutlined />} />
                <span className={letterClass}>  Maisha</span>
                <span className={letterClass}>     Total Investment Up</span>
                <span className={letterClass}>    Total Investment Down</span>
        <div>
            <Tabs
            defaultActiveKey="1"
            tabPosition={mode}
            style={{
            height: 220,
            }}
            items={new Array(30).fill(null).map((_, i) => {
            const id = String(i);
            return {
                label: `Investment-${id}`,
                key: id,
                disabled: i === 28,
                children: `Content of tab ${id}`,
            };
        })}
      />
        </div>
          <h2>Front End Developer / Painter </h2>
          <Link to="/friends">Home</Link>
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home

