import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import ImageUploading from 'react-images-uploading';
import './styles.css';
import profile_image from '../../Assets/profile_img.png'
import cover_image from '../../Assets/cover.jpg';
import CloseIcon from '@mui/icons-material/Close';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InterestsIcon from '@mui/icons-material/Interests';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CheckIcon from '@mui/icons-material/Check';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import ProfileContext from '../../Contexts/ProfileContext';
import { Alert } from '@mui/material';


export default function EditProfile( {setEditPopup} ) {
    const currentUserContext = useContext(UserContext);
    const currentUser = currentUserContext.user;
    const setProfileUser = useContext(ProfileContext).setProfileUser;
    const [updateStatus, setUpdateStatus] = useState('');
    const [profilePic, setProfilePic] = useState([]);
    const [coverPic, setCoverPic] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useRef();
    const curentCity = useRef();
    const fromCity = useRef();
    const relationship = useRef();
    const interests = useRef();
    // const password = useRef();
    const profileDescription = useRef();

    const onProPicChange = (imageList) => {
        setProfilePic(imageList);
    };
    const onCoverPicChange = (imageList) => {
        setCoverPic(imageList);
    };

    const profilePicHandler = async(e) => {
        e.preventDefault();
        const proPicName = {};

        if (profilePic[0]) {
          const data = new FormData();
          const fileName = Date.now() + profilePic[0].file.name;
          data.append("filename", fileName);
          data.append("file", profilePic[0].file);
          try {
            await axios.post("https://pepuls.herokuapp.com/api/upload", data);
          }catch (err) {}
          proPicName.profilePicture = fileName;
        }; 

        try {
            await axios.put(`https://pepuls.herokuapp.com/api/users/${currentUser._id}`, proPicName );
              window.location.reload();
        }catch (err) {}
    }

    const coverPicHandler = async () => {
        // e.preventDefault();
        const coverPicName = {};

        if (coverPic[0]) {
          const data = new FormData();
          const fileName = Date.now() + coverPic[0].file.name;
          data.append("filename", fileName);
          data.append("file", coverPic[0].file);
          try {
            await axios.post("https://pepuls.herokuapp.com/api/upload", data);
          }catch (err) {}
          coverPicName.coverPicture = fileName;
        }; 

        try {
            await axios.put(`https://pepuls.herokuapp.com/api/users/${currentUser.data._id}`, coverPicName );
              window.location.reload();
        }catch (err) {}
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const editProfile = async () => {
            const updateUser = await axios.put( `https://pepuls.herokuapp.com/api/users/${currentUser._id}`, {
                username: username.current.value,
                curentCity:  curentCity.current.value,
                fromCity:  fromCity.current.value,
                relationship:  relationship.current.value,
                interests:  interests.current.value,
                // password: password.current.value,
                profileDescription: profileDescription.current.value
            } );
 
            if(updateUser.data=== 'Success') {
                setUpdateStatus('Success')
            } else if(updateUser.data=== 'Login to update'){
                setUpdateStatus('Login to update')
            }
            else {
                setUpdateStatus('failure')
            }
        }
        editProfile();
        const gettingUser = async() => {
            const user = await axios.get(`https://pepuls.herokuapp.com/api/users/${currentUser._id}`);
            localStorage.setItem("user", JSON.stringify(user));
        }
        gettingUser();
        setProfileUser(currentUser);
 
    }


  return ( 
    <div className="edit-profile-container">
        <div className="edit-photo-container">
            <div className="edit-profile-title-card">
                <h5>Edit Profile</h5>
                <CloseIcon onClick={ () => setEditPopup(false)} />
            </div>
            <hr />

            <div className='profile-photo-edit-wrapper'>
                <h5>Profile picture</h5>
                
                <ImageUploading
                    multiple='false' 
                    value={profilePic}
                    onChange={onProPicChange}
                    maxNumber={1}
                    dataURLKey="data_url"
                    >
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll, 
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    }) => (
                    <>
                    <div className="profile-photo-edit">
                            
                        {profilePic[0] ? 
                        <img src={profilePic[0]} alt='' />
                        :
                        <img src={ currentUser.profilePicture? PF + `/${currentUser.profilePicture}` : profile_image } alt='' />
                        }
                        
                        <div className="upload-profile-photo" 
                            style={ isDragging ? { color: 'red' } : undefined } 
                            onClick={ onImageUpload } 
                            {...dragProps} 
                        >
                            <div onClick={ profilePicHandler }>Upload image</div>
                        </div>
                    </div>
                    </>
                )}
                </ImageUploading>
            </div>
            
            <div className='cover-photo-edit-wrapper'>
                <h5>Cover picture</h5>

                <ImageUploading
                    multiple='false' 
                    value={coverPic}
                    onChange={onCoverPicChange}
                    maxNumber={1}
                    dataURLKey="data_url"
                    >
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll, 
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    }) => (
                    <>
                    <div className="cover-photo-edit">
                            
                        { coverPic[0] ? 
                        <img src={coverPic[0]} alt='' />
                        :
                        <img src={ currentUser.coverPicture? PF + `/${currentUser.coverPicture}` : cover_image } alt='' />
                        }
                        <div className="upload-cover-photo" 
                            style={ isDragging ? { color: 'red' } : undefined } 
                            onClick={ onImageUpload } 
                            {...dragProps} 
                        >
                            <div onClick={ coverPicHandler }>Upload cover picture</div>
                        </div>
                    </div>
                    </>
                )}
                </ImageUploading>
            </div>

            { (updateStatus=== 'Success' )  && <Alert onClose={() => {setUpdateStatus('')}} severity="success">Profile is updated successfully.</Alert> }
            { (updateStatus=== 'Login to update' )  && <Alert onClose={() => {setUpdateStatus('')}} severity="failure">Enter your password to update.</Alert> }

            <div className='profile-content-edit-wrapper'>
                <h5>Bio</h5>
                <div className='profile-details-logo'>
                    <div className="profile-info-logo">
                        <DescriptionIcon />
                    </div>
                    <div className="profile-info-logo">
                        <DriveFileRenameOutlineIcon />
                    </div>
                    <div className="profile-info-logo">
                        <LocationCityIcon />
                    </div>
                    <div className="profile-info-logo">
                        <LocationOnIcon />
                    </div>
                    <div className="profile-info-logo">
                        <FavoriteIcon />
                    </div>
                    <div className="profile-info-logo">
                        <InterestsIcon />
                    </div>
                    <div className="profile-info-logo"> 
                        <CheckIcon />
                    </div>
                </div> 

                <form className='profile-details-form' onSubmit={onSubmitHandler} >
                    <input type='text' ref={profileDescription} placeholder='Profile description' defaultValue={currentUser.profileDescription} name='profileDescription'/> 
                    <input type='text' ref={username} defaultValue={currentUser.username} name='username'/> 
                    <input type='text' ref={curentCity} placeholder='Current city' defaultValue={currentUser.curentCity}/> 
                    <input type='text' ref={fromCity} placeholder='from' defaultValue={currentUser.fromCity} /> 
                    <input type='text' ref={relationship} placeholder='Relationship status' defaultValue={currentUser.relationship} /> 
                    <input type='text' ref={interests} placeholder='Interests' defaultValue={currentUser.interests} /> 
                    {/* <input type='password' ref={password} placeholder='Confirm your password' />  */}
                    <input type='submit' className='submit-but' value="Save details" />
                    
                </form>
            </div>

            <div className="profile-close-button" onClick={ () => setEditPopup(false)}>
                Close
            </div>
        </div>
    </div>
)
}
