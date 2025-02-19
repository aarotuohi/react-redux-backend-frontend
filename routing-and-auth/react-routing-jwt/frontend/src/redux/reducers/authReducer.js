// reducers/authReducer.js
import { SET_USER_AUTH, LOGOUT_USER, AUTH_ERROR } from "../actionTypes";

const initialState = {
  user: null, // user is initially marked as a guest
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH:
      return {
<<<<<<< HEAD
        ...state,
        user: action.payload,
        error: null,
        
=======
        "TODO": "Set the user's data from the successful registration response to state.auth.user, and clear any previous errors"
>>>>>>> de41159ccaf81ef0e38ed0c7e6eef5b16ad144b9
      };
    case LOGOUT_USER:
      return { ...initialState, user: { role: "guest" } };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
