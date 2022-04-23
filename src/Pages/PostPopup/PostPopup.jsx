import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProfileContext from '../../Contexts/ProfileContext';
import './styles.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import profile_image from '../../Assets/profile_img.png';
import FeedOptions from  '../../Components/FeedOptions.jsx/FeedOptions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MessageIcon from '@mui/icons-material/Message';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import RecommendIcon from '@mui/icons-material/Recommend';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkIcon from '@mui/icons-material/Bookmark'; 


export default function PostPopup( { post, user, likeHandler, likes } ) {
  const setProfileUser = useContext(ProfileContext).setProfileUser;
  const navigate = useNavigate(); 
  const [ feedOption, setFeedOption ] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='feedbar-popup'>
      <div className='left-post-container'>  
        <div className='post-wrapper-popup'>
          <div className='post-image-popup'>
          { post.postPicture && 
            <img src={ post.postPicture } alt="profile-pic" className="avatar" />
          }
          </div>
        </div>
        <div className="close-button-popup" >
          <CloseIcon onClick={ () => {navigate.goBack()} } />
        </div>
      </div>

      <div className='right-post-container'>  
        <div className='post-box-container-popup'>
          <div className='profile-logo'>
            <Link to="/profile" onClick={ () => setProfileUser(user) } style={{ textDecoration: 'none' }} >
              <img  src={user.profilePicture? PF + `/${user.profilePicture}` : profile_image}  alt="" />
            </Link>
          </div> 

          <div className='post-name-wrapper-popup'>
            <Link to="/profile" onClick={ () => setProfileUser(user) } style={{ textDecoration: 'none' }} >
              <div className='frnd-name-popup'>{user.username}</div>
            </Link>
            <div className='posted-time-popup'>Posted { moment(post.updatedAt).startOf('day').fromNow() }</div>
          </div>

          <div className='more-icon-post-popup' onClick={ () => { setFeedOption(!feedOption) } } >
            <MoreVertIcon />
          </div>
        </div>

        <div className='post-title-popup'>
          {post.description}
        </div>

        <div className={ (feedOption) ? "post-options-wrapper-popup" :  "feed-option-inactive-popup" }>
          <FeedOptions />
        </div>

        <div className='post-likes-popup'>
          <RecommendIcon />
          <span>{likes} people liked it.</span>
        </div>

        <hr />

        <div className='post-bottom-wrapper-popup'>
          <div className='post-like post-response-popup' onClick={likeHandler} >
            <ThumbUpIcon />
            <span>Like</span>
          </div>
          <div className='post-comment post-response-popup'>
            <MessageIcon />
            <span>Comment</span>
          </div>
          <div className='post-share post-response-popup'>
            <MobileScreenShareIcon />
            <span>Share</span>
          </div>
          <div className='post-share post-response-popup'>
            <BookmarkIcon />
            <span>Save</span>
          </div>
        </div>

        <hr />

      </div>
    </div>
    )
  }