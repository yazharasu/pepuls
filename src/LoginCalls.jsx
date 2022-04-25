import axios from "axios";

export const LoginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  
  try {
    if(userCredential.tokenId) {
      await axios.post("https://pepuls.herokuapp.com/api/auth/googlelogin", userCredential)
        .then( res => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      })

    }else {
      const res = await axios.put("https://pepuls.herokuapp.com/api/auth/login", userCredential);

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

  