import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../../Contexts/UserContext';
import ProfileContext from '../../Contexts/ProfileContext';
import profile_image from '../../Assets/profile_img.png';
import './styles.css';
import axios from 'axios';

export default function FollowingList() {
    const currentUserContext = useContext(UserContext);
    const currentUser = currentUserContext.user;
    const setProfileUser = useContext(ProfileContext).setProfileUser;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ frndsList, setFrndsList ] = useState( [ ] );

    useEffect( () => {
        if (currentUser.followings[0]) {
            setFrndsList([]);
            currentUser.followings[0].followings.forEach( (friend) => {
              const getUser = async () => {
                const res = axios.get(`https://pepuls.herokuapp.com/api/users/${friend}`);
                frndsList.push( ( res.data ) );
                setFrndsList(frndsList);
              };
              getUser();
            })
          }
    }, [currentUser.followings] );

return (
        <div className="following-list-wrapper">
            <div className="following-list">
                { frndsList.map( (friend) => {
                    return(
                    <div className='following-profile'>
                        <Link className='following-profile-details' to="/profile" onClick={ () => setProfileUser(friend) } style={{ textDecoration: 'none' }} >
                            <img src={ friend.profilePicture? PF + `/${friend.profilePicture}` : profile_image } alt='profile'></img>
                            <div>{ friend.username }</div>
                        </Link>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
 