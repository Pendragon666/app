import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, SET_CODE, SET_PROFILE } from '../types/user';

interface InitialState {
  authenticated: boolean;
  user: {
    id?: string;
    email?: string;
    username?: string;
    birthday?: string;
  };
  profile: {
    description?: string;
    fullName?: string;
    leagueName?: string;
    profileImage?: string;
    uid?: string;
  };
  loading: boolean;
  code: {
    limited: boolean;
    lastCode: string;
  };
}

export const initialState: InitialState = {
  authenticated: false,
  user: {},
  profile: {},
  loading: false,
  code: {
    limited: false,
    lastCode: '',
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_CODE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
