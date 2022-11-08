import React from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import News from './components/News'

import Home from './routes/Home'
import Friends from './routes/Friends'
import Groups from './routes/Groups'
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
          <Route path="/login" element={
            <form onSubmit={(e) => login(e)}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          } />
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

function login(e) {
  e.preventDefault();
  let request = {
    email: document.getElementById('exampleInputEmail1').value,
    password: document.getElementById('exampleInputPassword1').value
  }
  axios.post("http://localhost:3001/login", request)
    .then(resp => {
      alert(resp.data.message);
    })
    .catch(err => {
      console.log(err);
    })
}

export default App;
