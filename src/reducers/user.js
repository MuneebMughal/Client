import { authConstants } from "../actions/constants";
const initialState = {
  _id:"",
  id: "",
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
        _id: action.payload._id,
        id: action.payload.id,
        token: action.payload.token,
        isLoggedIn: true,
        name: action.payload.name,
        role: action.payload.role,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        score: action.payload.score,
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
