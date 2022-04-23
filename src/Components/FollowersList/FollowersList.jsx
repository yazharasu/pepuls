import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import ProfileContext from '../../Contexts/ProfileContext';
import profile_image from '../../Assets/profile_img.png';
import './styles.css';
import axios from 'axios';


export default function FollowersList() {
    const currentUserContext = useContext(UserContext);
    const currentUser = currentUserContext.user;
    const setProfileUser = useContext(ProfileContext).setProfileUser;
    const [ followersList, setFollowersList ] = useState( [ ] );
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect( () => {
        if (currentUser.followers[0]) {
            setFollowersList([]);
            currentUser.followers[0].followers.forEach( (friend) => {
              const getUser = async () => {
                const res = await axios.get(`https://pepuls.herokuapp.com/api/users/${friend}`);
                followersList.push( ( res.data ) );
                };
              getUser();
            })
            setFollowersList(followersList)
          }
    }, [currentUser] );


return (
    <div className="following-list-wrapper">
        <div className="following-list">
            {followersList.map( (friend) => {
                return(
                <div className='following-profile'>
                    <Link className='following-profile-details' to="/profile" onClick={ () => setProfileUser(friend) } style={ { textDecoration: 'none' } } >
                        <img src={ friend.profilePicture ? PF + `/${friend.profilePicture}` : profile_image } alt='profile' />
                        <div>{ friend.username }</div>
                    </Link>
                </div>
                )
            })}
        </div>
    </div>
    )
}
