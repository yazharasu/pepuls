import React, { useState, useContext } from 'react';
import ProfileContext from '../../Contexts/ProfileContext';
import TopNavbar from '../../Components/TopNavBar/TopNavbar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './styles.css';
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader';
import FollowingList from '../../Components/FollowingList/FollowingList';
import FollowersList from '../../Components/FollowersList/FollowersList';
import EditProfile from '../../Components/EditProfile/EditProfile';


export default function Friends( { searchActive, setSearchActive } ) {
  const profileUser = useContext(ProfileContext).profileUser;
  const [ editPopup, setEditPopup ] = useState(false);
  
  return (
    <>
    { (editPopup) && ( 
      <div className="edit-profile-popup">
        <EditProfile setEditPopup={setEditPopup} />
      </div>
    ) }

    { (!editPopup) && 
    (   
    <div className='friends-container'>
      <TopNavbar className='top-navbar-comp' setSearchActive={setSearchActive} />

      <div className= { (searchActive) ? 'search-bar-active' : 'search-bar-inactive'} > 
        <SearchBar setSearchActive={setSearchActive}  />
      </div>

      <div className="profile-header">
        <ProfileHeader className='profile-header-comp' setEditPopup={setEditPopup} />
      </div>
      
      <div className='friends-sub-container' > 
        <div className="following-friends-list">
          <div>
            <h5>Following</h5>
            <p>Following {profileUser.followings[0] ? profileUser.followings[0].followings.length : 0} people</p>
            <FollowingList />
          </div>
          
        </div>

        <div className="following-friends-list">
          <div>
            <h5>Followers</h5>
            <p>{profileUser.followers[0] ? profileUser.followers[0].followers.length : 0} people are following</p>
          </div>
          <FollowersList />
        </div>
      </div> 
    </div>
    )}
    </>
  )
}
