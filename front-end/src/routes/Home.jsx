import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useState } from 'react';
import { Col, Row, Space } from 'antd';
import './Home.css'
import Portfolio from '../components/Portfolio/Portfolio';
import PortfolioMonitor from '../components/PortfolioMonitor/PortfolioMonitor';

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  //State of the stocks
  const [stocks, setStocks] = useState([]);
  //State of Portfolio or PortfolioMonitor component to be shown
  const [isPortfolioReady, setIsPortfolioReady] = useState(false);
 
  const [size, setSize] = useState('small');

  const [mode, setMode] = useState('top');
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <>
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <div className="container">
        <div className="text-zone">
           <Row justify="left" align="left">
            <Col span={4}>
              <Avatar size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                    }} 
                      icon={<UserOutlined />} 
              />
            </Col>
            <Col>
              <Row>
                <span className={letterClass}>  Maisha Mahrin </span>
              </Row>
              <Row>
                <span className={letterClass}>     Total Investment Up</span>

              </Row>
              <Row>
                <p><span className={letterClass}>    Total Investment Down</span></p>
              </Row>               
            </Col>
                
           </Row> 
        </div>
        <p>
          
        </p>
        <div>
                 {/* If user is ready with portfolio shows PortfolioMonitor */}
                {!isPortfolioReady ? (
                    <div className='portfolio-configuration'>
                        <Portfolio stocks={stocks} setStocks={setStocks} />
                        <div className='portfolio-button-continue-wrapper'>
                          <p>


                          </p>
                            <button
                                className='portfolio-button-continue'
                                onClick={() => setIsPortfolioReady(true)}
                            >
                                <span>Continue</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='portfolio-monitor'>
                        <div className='portfolio-button-back-wrapper'>
                            <p>

                            
                            </p>
                            <button
                                className='portfolio-button-back'
                                onClick={() => setIsPortfolioReady(false)}
                            >
                                <span>Go back to Portfolio</span>
                            </button>
                            <p>

                            
                            </p>
                        </div>
                        <PortfolioMonitor
                            stocks={stocks}
                            setStocks={setStocks}
                        />
                    </div>
                )}
        </div>

      </div>
    </Space>        
    </>
  )
}

export default Home