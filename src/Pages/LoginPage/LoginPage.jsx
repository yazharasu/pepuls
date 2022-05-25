import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../Contexts/UserContext";
import { LoginCall } from "../../LoginCalls";
import './styles.css';
import { Alert } from '@mui/material';
import { GoogleLogin } from 'react-google-login';


export default function LoginPage() { 
  const email = useRef(); 
  const password = useRef();
  const currentUserContext = useContext(UserContext);
  const err_message = currentUserContext.err_message;
  const { isFetching, dispatch } = useContext(UserContext);

  const handleClick = (e) => {
    e.preventDefault();
    LoginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  }; 

  const responseSuccessGoogle = (res) => {
    LoginCall(
      { tokenId: res.tokenId },
      dispatch
    );
  }

  const responseErrorGoogle = (res) => {
    console.log(res)
  }

  return (
    <div className='login-page-container'>
      <div className="login-page-top-container">
        <h5>Pepuls</h5> 

        { (err_message==='wrong username or password') && <Alert severity="error">{err_message}</Alert> }

        <form className="login-wrapper" onSubmit={handleClick} >
          <input type='email'  className='login-input' ref={email} placeholder='Email'/>
          <input type='password' minLength="6" ref={password} className='login-input' placeholder='Password' />
          <input type='submit' value="Login" className='login-submit' disabled={isFetching} />
        </form>

        <hr className="hr-text" data-content="or" />      
        <GoogleLogin
          clientId="463762047419-hfsfvhgel813lk1av9lqsuthtpsl6pf6.apps.googleusercontent.com"
          buttonText="Login using Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
          scope="profile"
          className='google'
        />
      </div>

      <div className="login-page-bottom-container">
        <p className="signup-link">Don't have an account?
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <span> SignUp </span>
          </Link>
          here.
        </p>
      </div>
    </div>
  )
}
