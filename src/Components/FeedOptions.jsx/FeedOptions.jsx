import React from 'react';
import './styles.css';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import HideSourceOutlinedIcon from '@mui/icons-material/HideSourceOutlined';

export default function FeedOptions() {
  return (  
    <div className="feed-options">
        <div className="feed-options-container">
            <div className="feed-option">
                <BookmarkBorderOutlinedIcon />
                <span>Save post</span>
            </div>

            <div className="feed-option">
                <HideImageOutlinedIcon />
                <span>Hide post</span>
            </div>

            <div className="feed-option">
                <HideSourceOutlinedIcon />
                <span>Unfollow friend</span>
            </div>

        </div>
    </div>
    )
}