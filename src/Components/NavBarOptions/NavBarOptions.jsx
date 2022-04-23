import React,  { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { UserContext } from '../../Contexts/UserContext';
import OutsideClickHandler from 'react-outside-click-handler';

import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';


function NavBarOptions() {
  const currentUserContext = useContext(UserContext);
  const currentUser = currentUserContext.user;
  const [ navOption, setNavOption ] = useState(false);

  const logoutHandler = async () => {
    await axios.put( 'https://pepuls.herokuapp.com/api/users/logout', { username: currentUser.email });
    localStorage.removeItem("user");
    window.location.reload();
    console.log(navOption)
  }


  return (
    <OutsideClickHandler onOutsideClick= { ()=>{ setNavOption(false) } } >
    <div className='nav-options-popup' > 
    
      <Link className='option-line' to="/profile" style={{ textDecoration: 'none' }} >
        <PersonIcon />
        <span>Go to profile page</span>
      </Link>
          
      <Link className='option-line' to="/profile" style={{ textDecoration: 'none' }} >
        <EditIcon />
        <span>Update profile</span>
      </Link>

      <div className='option-line' onClick={logoutHandler} >
        <LogoutIcon />
        <span>Logout</span>
      </div>   

    </div>
    </OutsideClickHandler >
  )
}

export default NavBarOptions