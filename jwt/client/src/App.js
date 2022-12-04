import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import { loadUser } from './action/auth';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    {/* <Landing /> */}
                    <section className='container'>
                        <Alert />
                        <Routes>
                            <Route exact path='/' element={<Landing />} />
                            <Route
                                exact
                                path='/register'
                                element={<Register />}
                            />
                            <Route exact path='/login' element={<Login />} />
                        </Routes>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
