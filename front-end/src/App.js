import React from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import News from './components/News'

import Home from './routes/Home'
import Friends from './routes/Friends'
import Groups from './routes/Feed'
import Profile from './routes/Profile'
import Login from './routes/Login'
import CreateAccount from './routes/CreateAccount';
// import News from './routes/News';
import NewsContextProvider from './routes/NewsContext';
import axios from "axios";
// import NewsContext from './routes/NewsContext';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/news" element={
            <NewsContextProvider>
              <News />
            </NewsContextProvider>
          } />
        </Routes>
      </BrowserRouter>
      <div className="spacer" style={{ height: "3rem" }}></div>
      <Footer />
    </div>
  );
}

export default App;
