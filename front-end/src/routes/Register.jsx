import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../action/alert";
import { register } from "../action/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    let flag = false;
    e.preventDefault();
    var validRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    console.log('Email', email);
    if (password != password2) {
      flag = (false);
      alert("Passwords do not match!");
      setAlert("Passwords do not match", "danger");
    } 
    else if(password.length < 8){
      alert("Password Length to short");
    }
    else if(!validRegex.test(email)){
      flag = (false);
      console.log('em')
      alert("Please enter a valid email!");
      setAlert("Passwords do not match", "danger");
    } 
    else{flag = (true);}
    console.log(flag);
    if(flag) {
      console.log('HERE');
      
      register({ name, email, password });
      navigate("/");
     
    
    }
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              // required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              // required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              // required
              // minLength='6'
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              // required
              // minLength='6'
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
