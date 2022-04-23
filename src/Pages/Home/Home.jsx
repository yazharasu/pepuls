import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { UserContext } from '../../Contexts/UserContext';
import TopNavbar from '../../Components/TopNavBar/TopNavbar';
import Post from '../../Components/Post/Post';
import PostWindow from '../../Components/PostWindow/PostWindow';
import LeftBar from '../../Components/LeftBar/LeftBar';
import './Home.css';
import PostWindowPopup from '../../Components/PostWindowPopup/PostWindowPopup';

  
export default function Home( { postWindowTrigger, postWindowHandler, closeWindowHandler, searchActive, setSearchActive  } ) {
  const currentUserContext = useContext(UserContext);
  const currentUser = currentUserContext.user;
  const [ timelinePosts, setTimelinePosts ] = useState( );
  // const [ notifications, setNotifications ] = useState( { } );
  // const [ newNotiNum, setNewNotiNum ] = useState();
  // const [ notificationActive, setNotificationActive ] = useState(false);

   
  useEffect(() => { 
    const getCurrentUserTimeline = async () => {
      const res = await axios.get(`https://pepuls.herokuapp.com/api/posts/timeline/${currentUser._id}`)
      if( res.data.value !== 'undefined') {
        setTimelinePosts( 
          res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        )
      }else{
        setTimelinePosts([])
      }
    }
    getCurrentUserTimeline();
  }, [currentUser]);

  // useEffect(() => {
  //   const getUserProfilePosts = async () => {
  //     const resposne = await axios.get(`posts/profile/${currentUser.username}`)
      
  //     resposne.map( (post) => {
  //       if (post.postLikes.length > post.totLikes) {
  //         const new_likes = post.postLikes.slice(post.totLikes);

  //         new_likes.map( async(likedUser) => {
  //           const user = await axios.get( `users/${likedUser}` );
  //           notifications.likes.push( { post: post, likeUser: user } );
  //         })
  //         setNotifications(notifications);
  //       };

  //       if (post.comments.length > post.totComments) {
  //         const new_cmts = post.comments.slice(post.totComments);

  //         new_cmts.map( async(cmt) => {
  //           const cmtUser = await axios.get( `users/${cmt.commentUserId}` );
  //           notifications.comments.push( { post: post, cmtUser:cmtUser } ) ;
  //         })
  //         setNotifications( notifications );
  //       };
        
  //     })
  //   } 
  //   getUserProfilePosts();
  // }, [currentUser]);

 
  // const notiHandler = () => {
  //   setNotificationActive(!notificationActive);

  //   notifications.comments.map( (cmt) => {
  //     axios.put( `posts/${currentUser._id}/${cmt.post._id}`, { totComments: cmt.post.comments.length  } );
  //   })

  //   notifications.likes.map( (lik) => {
  //     axios.put( `posts/${currentUser._id}/${lik.post._id}`, { totLikes:lik.post.postLikes.length } );
  //   })

  //   setNewNotiNum(0)
  // }

  return (
    <div className='home-container'>
      <TopNavbar setSearchActive={setSearchActive} />
      <div className= { (searchActive) ? 'search-bar-active' : 'search-bar-inactive'} > 
        <SearchBar setSearchActive={setSearchActive}  />
      </div>
      
      <div className='home-contents' style={{ display:'flex' }} > 
        <div style={{ flex:'2.5' }}>
          <LeftBar className='leftbar'/>
        </div>
        
        <div className='post-window-main' style={{ flex:'9.5' }}>
          <div className='post-window'>
            <PostWindow postWindowHandler ={postWindowHandler} />            
          </div>
          
          <div className='feedbar-main-container' >
            { timelinePosts && timelinePosts.map( (post) => {
              return <Post post={post} /> } ) 
            }
          </div>
          <PostWindowPopup 
            postWindowTrigger={postWindowTrigger} 
            closeWindowHandler ={closeWindowHandler} >
          </ PostWindowPopup>
        </div>
      </div>
    </div>        
  )
}
