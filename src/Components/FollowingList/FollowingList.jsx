import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import ProfileContext from '../../Contexts/ProfileContext';
import profile_image from '../../Assets/profile_img.png';
import './styles.css';
import axios from 'axios';

export default function FollowingList() {
    const currentUserContext = useContext(UserContext);
    const currentUser = currentUserContext.user.data || currentUserContext.user ;
    const setProfileUser = useContext(ProfileContext).setProfileUser;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ frndsList, setFrndsList ] = useState( [ ] );

    useEffect( () => {
        if (currentUser.followings[0]) {
            setFrndsList([]);
            currentUser.followings[0].followings.forEach( (friend) => {
              const getUser = async () => {
                const res = await axios.get(`users/${friend}`);
                if (res.data !== undefined){
                    frndsList.push( ( res.data ) );
                }
                }
              getUser();    
            } )
            setFrndsList(frndsList);
            console.log(frndsList)
        }
    }, [currentUser] );

return (
        <div className="following-list-wrapper">
            <div className="following-list">
                { frndsList.map( (friend) => {
                    console.log(friend)
                    return(
                    <div className='following-profile' key={friend._id}>
                        <Link className='following-profile-details' to="/profile" onClick={ () => setProfileUser(friend) } style={{ textDecoration: 'none' }} >
                            <img src={ friend.profilePicture ? PF + `/${friend.profilePicture}` : profile_image } alt='profile'></img>
                            <div>{friend.username}</div>
                        </Link>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
 