import React, { useState, useEffect, useContext } from 'react';
import ProfileContext from '../../Contexts/ProfileContext';
import axios from 'axios';
import TopNavbar from '../../Components/TopNavBar/TopNavbar';
import PostWindow from '../../Components/PostWindow/PostWindow';
import Post from '../../Components/Post/Post';
import PostWindowPopup from '../../Components/PostWindowPopup/PostWindowPopup';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './styles.css';
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader';
import ProfileDetails from  '../../Components/ProfileDetails/ProfileDetails';
import FollowingList from '../../Components/FollowingList/FollowingList';
import FollowersList from '../../Components/FollowersList/FollowersList';
import EditProfile from '../../Components/EditProfile/EditProfile';


export default function ProfilePage( { postWindowTrigger, postWindowHandler, closeWindowHandler, searchActive, setSearchActive } ) {
  const [ editPopup, setEditPopup ] = useState(false);
  const [ profilePosts, setProfilePosts ] = useState([]);
  let profileUser = useContext(ProfileContext).profileUser

  if (profileUser !== null) {
    if (profileUser.data) {
      profileUser = profileUser.data;
    }
  };

  useEffect(() => {
    const getUserProfilePosts = async () => {
      const profile_user_email = profileUser.email;
      const response = await axios.get(`posts/profile/${profile_user_email}`);
      if(response.data.length !== undefined) {
        setProfilePosts(  
          response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
          }) )
      }else {
        setProfilePosts([]);
      }
      }
    getUserProfilePosts();
  }, [profileUser]);


  return (
    <>
    { (editPopup) && ( 
      <div className="edit-profile-popup">
        <EditProfile setEditPopup={setEditPopup} />
      </div>
    ) }
    
    { (!editPopup) && 
    (
    <div className='profile-container'>
    <TopNavbar className='top-navbar-comp' setSearchActive={setSearchActive} />
    <div className= { (searchActive) ? 'search-bar-active' : 'search-bar-inactive'} > 
      <SearchBar setSearchActive={setSearchActive}  />
    </div> 
 
    <div className="profile-header">
      <ProfileHeader className='profile-header-comp' setEditPopup={setEditPopup} />
    </div>
     
    <div className='profile-sub-container' style={{ display:'flex' }} > 

      <div style={{ flex:'4' }}>
        <div className='profile-page-left'> 
        <ProfileDetails setEditPopup={setEditPopup} />
        <div className="following-profile-list">
          <div>
            <h5>Following</h5>
            <p>following { profileUser.followings[0] ? profileUser.followings[0].followings.length : 0 } people</p>
          </div>
          <FollowingList />
        </div>
        
        <div className="following-profile-list">
          <div>
            <h5>Followers</h5>
            <p>{profileUser.followers[0] ? profileUser.followers[0].followers.length : 0 } people are following</p>
          </div>
          <FollowersList />
        </div>
        </div>
      </div>

      <div className='profile-post-window-main' style={{ flex:'8' }}>
        <div className='post-window'>
          <PostWindow postWindowHandler={postWindowHandler} />
        </div>
        <div className='feedbar-main-container' >
          {profilePosts.data && profilePosts.map( (post) => {
            return <Post post={post} /> 
          })}
        </div>
        <PostWindowPopup postWindowTrigger={postWindowTrigger} closeWindowHandler={closeWindowHandler} />
      </div>
    </div> 
    </div>
    )}
  </>
  )
}
