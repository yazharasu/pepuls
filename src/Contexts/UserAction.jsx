export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
export const LoginSuccess = (user) => ({
type: "LOGIN_SUCCESS",
payload: user.data,
});

export const LoginFailure = (error) => ({ 
type: "LOGIN_FAILURE",
});

export const WRONG_CREDENTIALS = () => ({
  type: "WRONG_CREDENTIALS",
});
