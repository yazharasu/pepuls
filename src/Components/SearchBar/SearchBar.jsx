import React,  { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ProfileContext from '../../Contexts/ProfileContext';
import './styles.css';
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios';
import profile_image from '../../Assets/profile_img.png';


function SearchBar( {setSearchActive} ) {
  const [ searchTerm, setSearchTerm ] = useState('') 
  const [ filteredData, setFilteredData ] = useState()
  const setProfileUser = useContext(ProfileContext).setProfileUser;
  const search_bar = useRef()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    search_bar.current.focus();
    const getfilteredData = async () => {
      const filtered = await axios.get(`users/search/${searchTerm}`)
      setFilteredData( filtered.data );
    }
    (searchTerm) && getfilteredData();
    }, [searchTerm] )

  
  return (
    <OutsideClickHandler onOutsideClick = { ()=>{ setSearchActive(false) } } >
    <div className='search-bar-popup' > 
      <div className="search-bar-pu"> 
        <div className='search-icon'> <SearchOutlinedIcon /> </div>
        <input type="search" ref={search_bar} onChange={ (e) => { setSearchTerm(e.target.value) }} placeholder="Search people..." />
      </div>
      
      <div className="search-results">
        { (filteredData) && filteredData.map( (user) => {
          return(
          <Link className='search-result' to="/profile" key={user._id} onClick={ () => {setProfileUser(user)} } style={{ textDecoration: 'none' }} >
            <img className='search-profile-image' src={ user.profilePicture? PF + `/${user.profilePicture}` : profile_image } alt=''></img>
            <div>{user.username}</div> 
          </Link>
          )
        })
        }
      </div>
    </div>
    </OutsideClickHandler >
  )
}

export default SearchBar