import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import OutsideClickHandler from 'react-outside-click-handler';


function Notifications( { setNotificationActive, notifications } ) {  
  
  return (
    <OutsideClickHandler onOutsideClick= { () => { setNotificationActive(false) } } >
    <div className='nav-noti-popup' > 
      <div className="noti-title">
        Notifications
      </div>
      
      { ( notifications.likes.length > 0 ||  notifications.comments.length > 0 ) ?
        (notifications.likes.map( (like) => (
          <Link className='noti-list-item' to="/post"  post={like.post} likes={like.post.postLikes.length} style={{ textDecoration: 'none' }} >
            <span>{like.likeUser.username} liked your post.</span>
          </Link>
        ))
        (notifications.comments.map( (cmt) => (
          <Link className='noti-list-item' to="/post"  post={cmt.post} likes={cmt.post.postLikes.length} style={ { textDecoration: 'none', color: 'inherit' } } >
            <span>{cmt.cmtUser.username} commented on your post.</span>
          </Link>
        ))))
        : ( <div className='no-new-fl'>No new notifications...</div>  )
      }
    </div>
    </OutsideClickHandler >
  )
};

export default Notifications