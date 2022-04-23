import React, { useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext';
import profile_image from '../../Assets/profile_img.png';
import './style.css';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PostWindow({ postWindowHandler }) {
  const currentUserContext = useContext(UserContext);
  const currentUser = currentUserContext.user;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='post-container'>
      <div className='post-box-container'>
        <div className='profile-logo'>
          <img src={ currentUser.profilePicture? PF + `/${currentUser.profilePicture}` : profile_image } alt="profile" className="avatar" />
        </div>
        <form className='post-box' onClick={ postWindowHandler }>
          <div>Hey..! {currentUser.username}. What's on your mind...</div> 
        </form>
        {/* <div className='post-content'>
          <MonochromePhotosIcon />
          <span>Photo/Video</span>
        </div>
        <div className='post-feeling'>
          <EmojiEmotionsIcon />
          <span>Feeling</span>
        </div> */} 
      </div>

      <div className='post-menu-container' >
        <div type="file"  className='post-content' onClick={ postWindowHandler }>
          <MonochromePhotosIcon />
          <span>Photo/Video</span>
        </div>
        <div className='post-feeling' onClick={ postWindowHandler }>
          <EmojiEmotionsIcon />
          <span>Feeling</span>
        </div>
        <div className='post-location' onClick={ postWindowHandler }>
          <LocationOnIcon />
          <span>Location</span>
        </div>
      
      </div>
    </div>
  )
}
