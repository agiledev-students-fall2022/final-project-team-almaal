import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useState } from "react";
import { Col, Row, Space, Button } from "antd";
import "./Home.css";
import Portfolio from "../components/Portfolio/Portfolio";
import PortfolioMonitor from "../components/PortfolioMonitor/PortfolioMonitor";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Home = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  //State of the stocks
  const [stocks, setStocks] = useState([]);
  const [username, setUsername] = useState("");
  //State of Portfolio or PortfolioMonitor component to be shown
  const [isPortfolioReady, setIsPortfolioReady] = useState(false);

  const [size, setSize] = useState("small");

  const [mode, setMode] = useState("top");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  const getUsername = async () => {
    try {
      const response = await axios.get(
        URL + "home/getUsername"
      );

      setUsername(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  getUsername();

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <div className="container">
          <div className="text-zone">
            <Space direction="horizontal" size="middle">
              <Row justify="left" align="left">
                <Col span={8}>
                  <Avatar
                    size={{
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
                <Col span={10}>
                  <Row className={letterClass}>
                    <span>{username}</span>
                  </Row>
                  <Row className={letterClass}>TotalInvestmentUp</Row>
                  <Row className={letterClass}>TotalInvestmentDown</Row>
                </Col>
              </Row>
            </Space>
          </div>
          <div>
            {/* If user is ready with portfolio shows PortfolioMonitor */}
            {!isPortfolioReady ? (
              <div className="portfolio-configuration">
                <Portfolio />
                <div className="portfolio-button-continue-wrapper">
                  {/* <p></p> */}
                  <Button
                    onClick={() => setIsPortfolioReady(true)}
                    type="primary"
                    className="portfolio-button-continue"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            ) : (
              <div className="portfolio-monitor">
                <div className="portfolio-button-back-wrapper">
                  <p></p>
                  {/* <button
                                    className='portfolio-button-back'
                                    onClick={() => setIsPortfolioReady(false)}
                                >
                                    <span>Go back to Portfolio</span>
                                </button> */}
                  <Button
                    onClick={() => setIsPortfolioReady(false)}
                    type="primary"
                    className="portfolio-button-back"
                  >
                    Go back to Portfolio
                  </Button>
                  <p></p>
                </div>
                <PortfolioMonitor stocks={stocks} setStocks={setStocks} />
              </div>
            )}
          </div>
        </div>
      </Space>
    </>
  );
};

export default Home;
