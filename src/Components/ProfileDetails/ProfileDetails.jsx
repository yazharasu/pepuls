import React, {useContext} from 'react';
import './styles.css';
import ProfileContext from '../../Contexts/ProfileContext';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InterestsIcon from '@mui/icons-material/Interests';


export default function ProfileDetails( { setEditPopup } ) {
    let profileUser = useContext(ProfileContext).profileUser;

    if (profileUser !== null) {
        if (profileUser.data) {
        profileUser = profileUser.data;
        }
    };

  return (
    <div className="profile-details">
        <div className="profile-details-left">
            <div className='profile-description'> 
                <h5>Intro</h5>
                <p>{profileUser.profileDescription}</p>
            </div>
            <div className="profile-info-logo">
                <LocationCityIcon />
                <span>Lives in {profileUser.curentCity}</span>
            </div>
            <div className="profile-info-logo">
                <LocationOnIcon />
                <span>From {profileUser.fromCity} </span>
            </div>
            <div className="profile-info-logo">
                <FavoriteIcon />
                <span>{profileUser.relationship} </span>
            </div>
            <div className="profile-info-logo">
                <ConnectWithoutContactIcon />
                <span>{ profileUser.followers[0] ? profileUser.followers[0].followers.length:0} people are following</span>
            </div>
            <div className="profile-info-logo">
                <PeopleAltIcon />
                <span>Following {profileUser.followings[0] ? profileUser.followings[0].followings.length:0} people</span>
            </div>
            <div className="profile-info-logo"> 
                <InterestsIcon />
                <span>Interested in: {profileUser.interests} </span>
            </div>
            <div className="profile-edit-button" onClick={ () => setEditPopup(true)}>
                <span>Edit Details </span>
            </div>
        </div>  
    </div>
)
}
