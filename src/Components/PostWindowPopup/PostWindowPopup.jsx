import React, { useContext, useState, useRef } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import ImageUploading from 'react-images-uploading';
import profile_image from '../../Assets/profile_img.png';
import './styles.css';
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';


export default function PostWindow( {postWindowTrigger, closeWindowHandler} ) {
  const currentUserContext = useContext(UserContext);
  const currentUser = currentUserContext.user;
  const [ images, setImages ] = useState(null);
  const [ isFilePicked, setIsFilePicked ] = useState(false);
  const description = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const onFileChange = (imageList) => {
    setImages(imageList);
    setIsFilePicked( true ); 
  };

  const postHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      description: description.current.value,
    };
  
    if (images[0]) {
      const data = new FormData();
      const fileName = Date.now() + images[0].file.name;
      data.append("filename", fileName);
      data.append("file", images[0].file); 
      newPost.postPicture = fileName;
      try {
        await axios.post("https://pepuls.herokuapp.com/api/upload", data);
      }catch (err) {}
    }; 

    try {
      await axios.post(`https://pepuls.herokuapp.com/api/posts/${currentUser._id}/post`, newPost);
        window.location.reload();
    }catch (err) {}

  }

  return (
    <div className="post-window-main-container" style={{ visibility: postWindowTrigger ? "visible" : "hidden", opacity: postWindowTrigger ? "1" : "0" }}>
      <div className='post-popup-container'>
      <OutsideClickHandler onOutsideClick= {closeWindowHandler} >
        <div className='post-popup-box-container'>
          <div className='create-post'>
            <div>Create Post</div>
             <CloseIcon onClick={closeWindowHandler} />
            <hr />
          </div>

          <div className='profile-logo-post'>
            <img src={ currentUser.profilePicture? PF + `/${currentUser.profilePicture}` : profile_image } alt="profile" className="avatar" />
            <div className='username-diaplay'>{ currentUser.username }</div>
          </div>

          <form className='post-popup-box' onSubmit={ closeWindowHandler }>
            <textarea type="input" ref={ description } placeholder= "Hey..! What's on your mind..." />
          </form>
          <ImageUploading
            multiple='false' 
            value={images}
            onChange={onFileChange}
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

          <div className='image-upload-display'>
            <div className='upload-image-button' style={ isDragging ? { color: 'red' } : undefined } onClick={ onImageUpload } {...dragProps}>
              Click here to upload image
            </div>
            <div className="post-image-wrapper">
              {imageList.map((image, index) => (
              <div key={index} className="image-item post-image">
                <img src={image['data_url']} alt="" width="100" />
    
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
              ))}
            </div>
            <button className= "remove-images-button" style={ !isFilePicked ? { display: 'none'}: { display: 'block'}} onClick={onImageRemoveAll}>Remove all images</button>
          </div>
          
          <div className='post-popup-menu-container'>
            <div type="file"  className='post-popup-content' style={ isDragging ? { color: 'red' } : undefined } onClick={ onImageUpload } {...dragProps}>
              <MonochromePhotosIcon />
              <span>Photo/Video</span>
            </div>
            <div className='post-popup-feeling'>
              <EmojiEmotionsIcon />
              <span>Feeling</span>
            </div>
            <div className='post-popup-location'>
              <LocationOnIcon />
              <span>Location</span>
            </div>
          </div>
          <div className='post-popup-submit' onClick={ postHandler } >
            <span>Post</span>
          </div>
          </>
          )}  
          </ImageUploading>
        </div>
      </OutsideClickHandler>
      </div>
    </div>
  )
}
