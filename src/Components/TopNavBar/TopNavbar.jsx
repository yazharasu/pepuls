import React, { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import profile_image from '../../Assets/profile_img.png';
import { Link } from 'react-router-dom';
import NavBarOptions from '../NavBarOptions/NavBarOptions';
import './styles.css';
import OutsideClickHandler from 'react-outside-click-handler';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function TopNavbar( { setSearchActive } ) {
  const [ navBarOptions, setNavBarOptions ] = useState(false);
  const currentUserContext = useContext(UserContext);
  const currentUser = currentUserContext.user.data || currentUserContext.user ;
 
  // const notiFollowersHandler = () => {
  //   setFollowNotiActive(!followNotiActive);
  //   axios.put( `users/${currentUser._id}`, { total: { total:currentUser.followers.followers.length }} );
  //   setFollowersTot(currentUser.followers.followers.length)
  // }
  // useEffect( () => {
  //   const notification = () => {
  //     const current_tot_followers = currentUser.followers.followers.length;
  //     setNewFollowersNum(current_tot_followers-followersTot);
  //     (current_tot_followers > followersTot && notificationActive) && 
  //       currentUser.followers.followers.slice(followersTot, current_tot_followers).map( async(follower) => {
  //         const user = await axios.get( `users/${follower._id}` );
  //         followNoti.push( user );
  //     } )
  //     setFollowNoti(followNoti);
  //   }
  //   notification();
  // }, [followersTot] )


  return (
    <div className="appbar-container">
      <div className="appbar">
        <div className="image-container">
          <div> 
            <p className='logo'>p</p>
          </div>
        </div>
        
        <Link  to='/home' style={{ textDecoration: 'none' }}>
          <div className="app-name">
            <h3>Pepuls</h3>
          </div> 
        </Link >

        <div className='search-bar-container'>
          <div className='search-bar' onClick={ () => setSearchActive(true)}> 
            <div className='search-icon'> <SearchOutlinedIcon /> </div>
            <div className='search-people'> Search people...</div>
          </div>
        </div>

        <div className="app-icons">
          {/* <div className='noti-icon' >
            <NotificationsOutlinedIcon />
            { newNotiNum>0 && <p>{newNotiNum}</p> }
          </div>
          <div className='people-icon' >
            <PeopleAltOutlinedIcon />
            { newFollowersNum>0 && <p>{newFollowersNum}</p> }
          </div> */}
          <div >
            <Link to="/profile"> <img src={ currentUser.profilePicture ? PF + `/${currentUser.profilePicture}` : profile_image } alt="" /></Link>
          </div>
          <div className='arrow-down' onClick={ () => setNavBarOptions(!navBarOptions)}> 
            <KeyboardArrowDownOutlinedIcon  /> 
          </div>
        </div>
        <OutsideClickHandler onOutsideClick= {() => setNavBarOptions(false)} >
          { (navBarOptions) && 
            <NavBarOptions className='nav-bar-options-main'/>
          } 
        </OutsideClickHandler >
      </div>
    </div>
  ) 
}
