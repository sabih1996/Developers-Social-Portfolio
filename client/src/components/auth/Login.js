import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  //initialize state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  //change values of state according to user input

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //create object having state values that contain all input values states

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("loggedin");
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary text-center'>Sign In </h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign In Your Account
        </p>
        <form
          className='form'
          action='create-profile.html'
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => onChange(e)}
              name='email'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minlength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
