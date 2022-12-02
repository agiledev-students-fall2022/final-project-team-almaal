import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../action/auth';
import PropTypes from 'prop-types';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <a onClick={logout} href='#!'>
                    Logout
                </a>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li>
                <a href='#!'>Dev</a>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>Title</Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                // <Fragment>{authLinks}</Fragment>
            )}
        </nav>
    );
};

Navbar.proTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
