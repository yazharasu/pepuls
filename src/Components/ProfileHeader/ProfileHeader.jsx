import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ProfileContext from '../../Contexts/ProfileContext';
import { UserContext } from '../../Contexts/UserContext';
import cover_image from '../../Assets/cover.jpg';
import profile_image from '../../Assets/profile_img.png';
import './styles.css';
import 'reactjs-popup/dist/index.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ProfileHeader( {setEditPopup} ) {
    const currentUserContext = useContext(UserContext);
    const currentUser = currentUserContext.user;
    const { profileUser, setProfileUser } = useContext(ProfileContext);
    const [ follow, setFollow ] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

                                                                                                 
    useEffect(() => {
        if(currentUser.followings[0]){
            currentUser.followings.followings.includes(profileUser._id) ? setFollow(true) : setFollow(false)
        }
    }, [profileUser, currentUser])

    useEffect( () => {
        const gettingUser = async() => {
            const user = await axios.get(`https://pepuls.herokuapp.com/api/users/${currentUser._id}`);
            localStorage.setItem("user", JSON.stringify(user));
    
            const proUser = await axios.get(`https://pepuls.herokuapp.com/api/users/${profileUser._id}`);
            setProfileUser(proUser);
        }
        gettingUser()
    }, [follow])
 
    const followHandler = () => {
        if(follow) {
            axios.put(`https://pepuls.herokuapp.com/api/users/${profileUser._id}/unfollow`, { userId:currentUser._id });
            setFollow( false );
        }else {
            axios.put(`https://pepuls.herokuapp.com/api/users/${profileUser._id}/follow`, { userId:currentUser._id });
            setFollow( true );
        } 
    }


  return (
    <div className='profile-header-container'>
        <div className="profile-page-photo-container">
            <div className="cover-photo-wrapper">
                <img src={ profileUser.coverPicture? PF + `/${profileUser.coverPicture}` : cover_image } alt='cover-pic'></img>
            </div>
            <div  className="profile-photo-wrapper"> 
                <img src={ profileUser.profilePicture? PF + `/${profileUser.profilePicture}` : profile_image } alt=''></img>
            </div>
            <div className='header-bottom'>
                <h5>{profileUser.username}</h5>
                <p>{profileUser.followers[0] ? profileUser.followers[0].followers.length:0} Followers</p>
            </div>
 
            <div className='profile-button'>
                { (profileUser.username === currentUser.username) ?
                    (<div className='button-wrapper button-wrapper-edit'  onClick={ () => setEditPopup(true)} >
                     <SettingsIcon /> 
                     <div className='edit-button'>Edit Profile</div>
                    </div>)
                    :
                    (<>
                    <div className="button-wrapper button-wrapper-follow" onClick={ followHandler }>
                        <PersonAddIcon />
                        { (follow) ? <div className='follow-button'>Unfollow</div> : <div className='follow-button'>Follow</div> }
                    </div>
                    <div className="button-wrapper button-wrapper-msg">
                        <MessageIcon />
                        <div className='msg-button'>Message</div>
                    </div>
                    </>)
                }
            </div>
        </div>
    </div>
  )
}
