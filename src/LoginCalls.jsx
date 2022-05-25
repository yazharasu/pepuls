import axios from "axios";

export const LoginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  
  try {
    if(userCredential.tokenId) {
      await axios.post('auth/googlelogin', userCredential)
        .then( res => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } ) 
    
    }else if(userCredential.password){  
      const res = await axios.put("auth/login", userCredential);
      if(res.data.username) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      }else if(res.data === 'Wrong username or password') {
        dispatch({ type: "WRONG_CREDENTIALS", payload: null });
      }     

    }else if (userCredential.userId && userCredential.status === "follow")  {
      await axios.put(`users/${userCredential.ProId}/follow`, { userId:userCredential.userId })
        .then( async(res) => {
          if (res = "success") {
            await axios.get(`users/:${userCredential.userId}`, userCredential)
              .then( res => {
                dispatch({ type: "FOLLOW", payload: res.data });
            } )
          }
      } )
 
    }else if (userCredential.userId && userCredential.status === "unfollow")  {
      await axios.put(`users/${userCredential.ProId}/unfollow`, { userId:userCredential.userId })
        .then( async(res) => {
          if (res = "success") {
            await axios.get(`users/:${userCredential.userId}`, userCredential)
              .then( res => {
                dispatch({ type: "UNFOLLOW", payload: res.data });
            } )
          }
      } )
    }
    
  }catch (err) { 
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

  