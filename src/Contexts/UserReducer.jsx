const UserReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
          err_message: null,
        };
      case "LOGIN_SUCCESS":
        return {  
          user: action.payload,
          isFetching: false,
          error: false,
          err_message: null,  
        };
      case "FOLLOW":
        return {  
          user: action.payload,
          isFetching: false,
          error: false,
          err_message: null,  
        };  
      case "UNFOLLOW":
        return {  
          user: action.payload,
          isFetching: false,
          error: false,
          err_message: null,  
        };    
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
          err_message: null,
        };
      case "WRONG_CREDENTIALS":
      return {
        user: null,
        isFetching: false,
        error: true,
        err_message: "wrong username or password",
      };
      default:
        return state;
    }
  };
  
  export default UserReducer;