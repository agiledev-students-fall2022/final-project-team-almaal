import React from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'

import Home from './routes/Home'
import Friends from './routes/Friends'
import Groups from './routes/Groups'
import Profile from './routes/Profile'
import Login from './routes/Login'
import CreateAccount from './routes/CreateAccount';
import News from './routes/News';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/profile" element={<Profile />} />
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
=======
          <Route path="/news" element={<News />} />
>>>>>>> 6daa87b9925aacd8f5977c983c1e5d727b78fdc1
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
