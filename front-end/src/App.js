import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './routes/Home';
import Friends from './routes/Friends';
import Groups from './routes/Feed';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Register from './routes/Register';
import News from './components/News'

import setAuthToken from './utils/setAuthToken';

import { useSelector } from 'react-redux';
import store from './store';
import { loadUser } from './action/auth';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';

import useToken from './useToken';

console.log('ls_token', localStorage.token);

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App({ isAuthenticated }) {
    const state = useSelector(state => state)

    console.log(store.getState())
    const { token, setToken } = useToken();

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    // if (!localStorage.token) {
    //     return (
    //         <div className='App'>
    //             <p>Authenticated: {isAuthenticated.toString()}</p>
    //             <BrowserRouter>
    //                 <Navbar flag={true} />
    //                 <Routes>
    //                     <Route path='/' element={<Login setToken={setToken} />} />
    //                     <Route path='/register' element={<Register />} />
    //                     <Route path="*" element={
    //                         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25%' }}>
    //                             <h2>404 Page not found</h2>
    //                         </div>
    //                     } />
    //                 </Routes>
    //             </BrowserRouter>
    //             <div className='spacer' style={{ height: '3rem' }}></div>
    //             <Footer />
    //         </div>
    //     )
    // }

    return (
        <div className='App'>
            <BrowserRouter>
                <p>Authenticated: {state.auth.isAuthenticated.toString()}</p>
                <Navbar setToken={setToken} flag={false} />
                <Routes>

                    {
                        state.auth.isAuthenticated ?
                            <>
                                <Route path='/' element={<Home />} />
                                <Route path='/friends' element={<Friends />} />
                                <Route path='/groups' element={<Groups />} />
                                <Route path='/profile' element={<Profile />} />
                                {/* <Route path='/news' element={<News />} /> */}
                            </> : <>
                                <Route path='/' element={<Login setToken={setToken} />} />
                                <Route path='/register' element={<Register />} />
                            </>
                    }
                    <Route path="*" element={
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25%' }}>
                            <h2>404 Page not found</h2>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
            <div className='spacer' style={{ height: '3rem' }}></div>
            <Footer />
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(App);
