import { authConstants } from "../actions/constants";
const initialState = {
  email: "",
  isLoggedIn: false,
  loading: false,
  token: "",
  name: "",
  role: "",
  firstName: "",
  lastName: "",
  score: "",
  warning: "",
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN: {
      state = {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        isLoggedIn: true,
        name: action.payload.name,
        role: action.payload.role,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        score: action.payload.score,
        warning: action.payload.warning,
      };
      break;
    }
    case authConstants.LOGOUT: {
      state = initialState;
      break;
    }
    default:
      break;
  }
  return state;
};
