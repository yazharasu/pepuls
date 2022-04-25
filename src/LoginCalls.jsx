import axios from "axios";

export const LoginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  
  try {
    if(userCredential.tokenId) {
<<<<<<< HEAD
      await axios.post("https://pepuls.herokuapp.com/api/auth/googlelogin", userCredential)
=======
      await axios.post('pepuls.herokuapp.com/api/auth/googlelogin', userCredential)
>>>>>>> 06c35f1930f62ec339b23e9a34267f4752c182c3
        .then( res => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      })
      
    }else {
      const res = await axios.put("pepuls.herokuapp.com/api/auth/login", userCredential);

      if(res.data.username) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  
      }else if(res.data === 'Wrong username or password') {
        dispatch({ type: "WRONG_CREDENTIALS", payload: null });
      }
    }
    
  }catch (err) { 
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

  
