import React, { useRef  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

export default function CreateProfile() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordReenter = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordReenter.current.value === password.current.value) {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }; 
      try {
        await axios.post("auth/register", user);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
      
    } else {
      passwordReenter.current.setCustomValidity("Passwords don't match!");
    }
  };

  return (
    <div className='create-profile-container'>
      <div className="create-profile-top-container">
        <h5>Pepuls</h5> 

        <form className="create-data-wrapper" onSubmit={handleClick} >
          <input type='text' required ref={username} className='signup-input' placeholder='Username'/>
          <input type='email' required ref={email} className='signup-input' placeholder='Email' />
          <input type='password' required ref={password} className='signup-input' placeholder='Password' />
          <input type='password' required ref={passwordReenter} className='signup-input' placeholder='Re-enter Password' />
          <input type='submit' value="SignUp" className='signup-submit' />
        </form>

        <hr class="hr-text" data-content="Or" />
      
        <input type='submit' value="SignUp using Google" className='google' />
      </div>

      <div className="create-profile-bottom-container">
        <p className="login-link">Already have an account?
        <Link to='/' style={{ textDecoration: 'none' }} >
          <span> Login </span>
        </Link>
        here.
        </p>
      </div>

    </div>
  )
}
