import React,  {useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import ProfileContext from '../../Contexts/ProfileContext';
import OutsideClickHandler from 'react-outside-click-handler';


function FollowersNotifications( { setNotificationActive, followNoti } ) {
  const setProfileUser = useContext(ProfileContext).setProfileUser;

  return (
    <OutsideClickHandler onOutsideClick= { () => { setNotificationActive(false) } } >
    <div className='nav-noti-popup' > 
      <div className="noti-title">
        New followers
      </div>
    
      {(followNoti.length>0) ? followNoti.map( (noti) => (
        <Link className='noti-list-item' onClick={ () => setProfileUser(noti) } to="/profile" style={{ textDecoration: 'none' }} >
          <span>{noti.username} is following you.</span>
      </Link>
      )): 
      (
        <div className='no-new-fl'>No new followers...</div>
      )
      }
    </div>
    </OutsideClickHandler >
  )
}

export default FollowersNotifications