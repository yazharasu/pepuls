import React, { useState, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from './Contexts/UserContext';
import ProfileContext from './Contexts/ProfileContext';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import CreateProfile from './Pages/CreateProfile/CreateProfile';
import PostPopup from './Pages/PostPopup/PostPopup';
import Friends from './Pages/Friends/Friends';

function App() {
  const currentUserContext = useContext(UserContext);
  const currentUser = currentUserContext.user;
  const [ profileUser, setProfileUser ] = useState( currentUser ); 
  const [ postWindowTrigger, setPostWindowTrigger ] = useState(false);
  const [ searchActive, setSearchActive ] = useState(false);
  
  const postWindowHandler = () => {
    setPostWindowTrigger(true);
  }
  
  const closeWindowHandler = () => {
    setPostWindowTrigger(false);
  }

  return (
    <div>
      <ProfileContext.Provider value={ { profileUser,  setProfileUser } } >
      <Router>
        <Routes>
          <Route exact path='/' element = { (currentUser) ? <Navigate to="/home" /> : <LoginPage /> } />
          
          <Route path='/signup' element = { (currentUser) ? <Navigate to="/home" /> : <CreateProfile /> } />

          <Route path='/home' element = { (currentUser) ?
            <Home 
              postWindowTrigger={postWindowTrigger} 
              postWindowHandler={postWindowHandler} 
              closeWindowHandler={closeWindowHandler} 
              searchActive = {searchActive}
              setSearchActive ={setSearchActive}
              /> :
           <Navigate to="/" /> }
            />
          
          <Route path='/profile' element = { (currentUser) ? 
            <ProfilePage 
              postWindowTrigger={postWindowTrigger} 
              postWindowHandler={postWindowHandler} 
              closeWindowHandler={closeWindowHandler} 
              searchActive = {searchActive}
              setSearchActive ={setSearchActive}
              /> : <Navigate to="/" /> } />

          <Route path='/post' element = { <PostPopup /> } />

          <Route path='/friends'  element = { <Friends searchActive = {searchActive} setSearchActive ={setSearchActive} /> } 
          />

        </Routes>
      </Router>
      </ProfileContext.Provider>
    </div>
  );
}

export default App;