import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import News from './components/News';

import Home from './routes/Home';
import Friends from './routes/Friends';
import Groups from './routes/Feed';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Register from './routes/Register';
import CreateAccount from './routes/CreateAccount';
// import News from './routes/News';
import NewsContextProvider from './routes/NewsContext';
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './action/auth';
// import NewsContext from './routes/NewsContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import useToken from './useToken';

// require('dotenv').config();
// console.log(process.env)

console.log('ls_token', localStorage.token);
const URL = "http://localhost:3001/";

if (localStorage.token) {
    setAuthToken(localStorage.token);    
}

function ret_Login(setToken){
    return(
        <div className='App'>
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar flag={true}/>
                    <Routes>
                        <Route path='/' element={<Login setToken={setToken}/>} />
                        <Route path='/register' element={<Register />} />
                        <Route path="*"  element={
                                            <div style={{display:'flex', justifyContent:'center', marginTop:'25%'}}>
                                                <h2>404 Page not found</h2>
                                            </div>
                        }/>
                        {/* <Route path='/' element={<Login setToken={setToken}/>} />
                        <Route path='/register' element={<Register />} /> */}
                    </Routes>
                </BrowserRouter>
                <div className='spacer' style={{ height: '3rem' }}></div>
                <Footer />
            </Provider>
        </div>
    )
}

function App() {
    const { token, setToken } = useToken();
    const [render, rerender] = useState(false);

    //const navigate = useNavigate();

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);


    if(!localStorage.token){
        return (ret_Login(setToken));
    }

    return (
        <div className='App'>
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar setToken={setToken} flag={false}/>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/friends' element={<Friends />} />
                        <Route path='/groups' element={<Groups />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </BrowserRouter>
                <div className='spacer' style={{ height: '3rem' }}></div>
                <Footer />
            </Provider>
        </div>
    );
}

export default App;
