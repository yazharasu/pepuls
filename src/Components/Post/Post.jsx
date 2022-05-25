import React, { useState, useEffect, useContext, useRef } from 'react';
import './styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProfileContext from '../../Contexts/ProfileContext';
import { UserContext } from '../../Contexts/UserContext';
import moment from 'moment';
import profile_image from '../../Assets/profile_img.png';
import FeedOptions from  '../../Components/FeedOptions.jsx/FeedOptions';
import OutsideClickHandler from 'react-outside-click-handler';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MessageIcon from '@mui/icons-material/Message';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import RecommendIcon from '@mui/icons-material/Recommend';
import BookmarkIcon from '@mui/icons-material/Bookmark';
 
export default function Post( { post } ) {
  const currentUserContext = useContext(UserContext);
  const currentUser = currentUserContext.user.data || currentUserContext.user ;
  const [ feedOption, setFeedOption ] = useState(false);
  const { profileUser, setProfileUser } = useContext(ProfileContext);
  const [ likes, setLikes ] = useState( post.postLikes.length );
  const [ isLiked, setIsLiked ] = useState( false );
  const [ user, setUser ] = useState( { } );
  const [ comments, setComments ] = useState([]);
  const [ commentActive, setCommentActive ] = useState(false);
  const new_comment = useRef("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  if (profileUser !== null) {
    if (profileUser.data) {
        setProfileUser(profileUser.data);
    }
  };

  // getting and setting user using userId from post
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`https://pepuls.herokuapp.com/api/users/${post.userId}`)
      setUser( res )
    }
    getUser();

  }, [post] );

  useEffect( () => {
    setComments([]);
    (post.comments) && post.comments.map( async (cmt) => {
      const commentUser = await axios.get( `https://pepuls.herokuapp.com/api/users/${cmt.commentUserId}` );
      comments.push( { comment:cmt, commentUser: commentUser.data });
    } )
    setComments(comments);
    }, [post.comments]
  )

  // Checking whether the currentUser liked the post or not (true/false)
  useEffect(() => {
    post.postLikes && 
    setIsLiked( post.postLikes.includes(currentUser._id) );
  }, [ currentUser, post.postLikes ] );   

  // like handler to handle like/dislike
  const likeHandler = async() => {
    try{
      await axios.put(`posts/like`, { userId: currentUser.data._id, postId: post._id });
      setLikes( post.postLikes ? post.postLikes.length : 0);
    } catch(err) { console.log(err) }

    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  }

  const commentActHandler= () => {
    setCommentActive(!commentActive);
  }

  const commentSubHandler = (e) => {
    e.preventDefault();
    axios.put( `posts/${currentUser.data._id}/${post._id}/comment`, { comment : new_comment.current.value } );
  }
  
  const FeedOptionHandler = () => {
    setFeedOption(!feedOption);
  }

   
  return (
    <OutsideClickHandler onOutsideClick={ () => setFeedOption(false) } >
      <div className='post-main-container'>
        <div className={ (feedOption) ? "post-options-wrapper" :  "feed-option-inactive" }>
          <FeedOptions /> 
        </div>
      
        <div className='post-box-container'>
          <Link to="/profile" onClick={ () => setProfileUser(user) } style={{ textDecoration: 'none' }} >
            <div className='profile-logo'>
              <img src={profileUser.profilePicture? PF + `/${profileUser.profilePicture}` : profile_image} alt="profile"/>
            </div>
          </Link>
    
          <div className='post-name-wrapper'>
            <Link to="/profile" onClick={ () => setProfileUser(user) } style={{ textDecoration: 'none', color: 'inherit' }} >
            <div className='frnd-name'>{profileUser.username}</div>
            </Link> 
            <Link to="/profile" onClick={ () => setProfileUser(user) } style={{ textDecoration: 'none', color: 'inherit' }} >
            <div className='posted-time'>Posted { moment(post.updatedAt).startOf('day').fromNow() }</div>
            </Link> 
          </div>
          
          <div className='more-icon-post' onClick={ FeedOptionHandler } >
            <MoreVertIcon /> 
          </div>
        </div>
 
        <div className='post-wrapper'>
          <div className='post-title'>
            {post.description}  
          </div>
          <div className= { post.postPicture ? 'post-image-con' : 'post-image-inactive' } >
            <Link to="/post" post={post} user={user} likeHandler={likeHandler} likes={likes} tyle={{ textDecoration: 'none', color:'inherit' }} >
              <img src={PF + `/${post.postPicture}`} alt="" className='post-image-img' />
            </Link>
          </div>
        </div>
      
        <div className='post-likes'>
          <RecommendIcon />
          <span>{likes} likes</span>
        </div>

        <hr />

        <div className='post-bottom-wrapper'>
          <div className={ (isLiked) ? 'post-response liked-post' : 'post-like post-response'} onClick={ likeHandler }>
            <ThumbUpIcon  />
            { (isLiked) ? <span className='liked-word'>Liked</span> : <span >Like</span> }
          </div>
          <div onClick={ commentActHandler } className='post-comment post-response'>
            <MessageIcon />
            <span>Comment</span>
            { comments.length>0 && <div>{comments.length}</div> }
          </div>
          <div className='post-share post-response'>
            <MobileScreenShareIcon />
            <span>Share</span>
          </div> 
          <div className='post-share post-response'>
            <BookmarkIcon />
            <span>Save</span>
          </div>
        </div>

        <div className="comments-wrapper">
          <div className="comment-wrap">
            { (commentActive) && (
            <form className="new-comment" onSubmit={ commentSubHandler }>
              <input className='comment-text' ref={new_comment} type='text' />
              <input className='comment-submit-but' type='submit' value='Comment'  />
            </form> 
            ) } 
          </div>

          { comments.map( (cmt) => (
          <>
          <div className="all-comments" key={cmt._id}>
            <Link to="/profile" className="cmt-user-data" onClick={ () => setProfileUser(cmt.commentUser) } style={ { textDecoration: 'none', color: 'inherit' } }>
              <img className='cmt-user-image' src={cmt.commentUser.profilePicture? PF + `/${cmt.commentUser.profilePicture}` : profile_image} alt="" />
              <div className='cmt-username'>{cmt.commentUser.username}:</div>
            </Link>
            <div className='cmt-cmt'>{cmt.comment.comment} </div>
          </div>

          <div className='cmt-time' > 
            { moment(cmt.comment.updatedAt).startOf('day').fromNow() }
          </div> 
          </>
          ) ) }
        </div>
      </div>
    </OutsideClickHandler>
  )
}
