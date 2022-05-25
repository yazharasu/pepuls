import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext';
import ProfileContext from '../../Contexts/ProfileContext';
import profile_image from '../../Assets/profile_img.png';
import './styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import VideocamIcon from '@mui/icons-material/Videocam';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import EventIcon from '@mui/icons-material/Event';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export default function LeftBar() {
  const currentUserContext = useContext(UserContext);
  const currentUser = currentUserContext.user.data || currentUserContext.user ;
  var { profileUser, setProfileUser } = useContext(ProfileContext);
  const [ onlineFrnds, setOnlineFrnds ] = useState(true);
  const [ onlineFrndsList, setOnlineFrndsList ] = useState( [ ] );
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   
  if (profileUser !== null) {
    if (profileUser.data) {
        setProfileUser(profileUser.data);
    }
  };

  useEffect(() => {
    if (currentUser.followings[0]) {
      currentUser.followings[0].followings.forEach( (friend) => {
        const getUser = async () => {
          const res = await axios.get(`users/${friend}`);
          (res.loggedIn === true) && onlineFrndsList.push( ( res.data ) )
          setOnlineFrndsList(onlineFrndsList);
        };
        getUser();
      })
    }
  }, [ currentUser.followings] );

  const frndsListActivate = () => {
    setOnlineFrnds(!onlineFrnds);
  }

  return (
    <div className='leftbar-container'>
      <div className='menu-list'>

        <Link to="/profile" style={{ textDecoration: 'none' }} >
          <div className='profile-link list-ele'>
            <div className='menu-logo'>
              <img src={ profileUser.profilePicture ? PF + `/${profileUser.profilePicture}` : profile_image } alt="profile" className="avatar" />
            </div>
            <div className='menu-title profile-name'>
              <p>{ currentUser.username }</p>
            </div>
          </div>
        </Link>

        <div>
        <Link  className='friends-link list-ele' to="/friends" style={{ textDecoration: 'none' }} >
          <div className='menu-logo people-logo'>
            <PeopleAltIcon />
          </div>
          <div className='menu-title'>
            <p>Friends</p>
          </div>
        </ Link>
        </div>
        
        <div className='group-link list-ele'>
          <div className='menu-logo group-logo'>
            <GroupsIcon />
          </div>
          <div className='menu-title'>
            <p>Groups</p>
          </div>
        </div>

        <div className='videos-link list-ele'>
          <div className='menu-logo videos-logo'>
            <VideocamIcon />
          </div>
          <div className='menu-title'>
            <p>Videos</p>
          </div>
        </div>

        <div className='saved-link list-ele'>
          <div className='menu-logo saved-logo'>
            <BookmarkOutlinedIcon />
          </div>
          <div className='menu-title'>
            <p>Saved</p>
          </div>
        </div>

        <div className='pages-link list-ele'>
          <div className='menu-logo pages-logo'>
            <AssistantPhotoIcon />
          </div>
          <div className='menu-title'>
            <p>Pages</p>
          </div>
        </div>

        <div className='event-link list-ele'>
          <div className='menu-logo events-logo'>
            <EventIcon />
          </div>
          <div className='menu-title'>
            <p>Events</p>
          </div>
        </div>

        <div className='weather-link list-ele'>
          <div className='menu-logo weather-logo'>
            <WbSunnyIcon />
          </div>
          <div className='menu-title'>
            <p>Weather</p>
          </div>
        </div>

        <div className= 'frnds-online list-ele' onClick={ frndsListActivate }>
          <div className='menu-logo weather-logo'>
            <OnlinePredictionIcon />
          </div>
          <div className='menu-title'>
            <p>Friends Online</p>
          </div>
          <div className='arrow-button'>
            <KeyboardArrowDownOutlinedIcon />
          </div>
        </div>

        <hr />
        <ul className= {(onlineFrnds) ? 'sidebar-frnds-list':'sidebar-frnds-list onlineNotActive'} >
          { (onlineFrndsList.length > 1) ?
          onlineFrndsList.map( (friend) => {
            return(
            <li>
              <Link to="/profile" style={{ textDecoration: 'none' }} onClick={ () => setProfileUser(friend) } >
                <img className='sidebar-frnd-img'  alt='friend' src={ (friend.profilePicture) ? friend.profilePicture : profile_image } />
                <span>{friend.username}</span>
              </Link>
            </li> )
            }
          ) :
          ( <li> <span>"Opps..no one is available"</span> </li> )
          }
        </ul>
      </div>
    </div>
  )
}
