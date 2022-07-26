import { authConstants } from "../actions/constants";
const initialState = {
  email: "",
  isLoggedIn: false,
  loading: false,
  token: "",
  name: "",
  role: "",
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
