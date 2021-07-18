import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, SET_CODE } from '../types/user';

interface InitialState {
  authenticated: boolean;
  credentials: any;
  loading: boolean;
  code: {
    limited: boolean;
    lastCode: string;
  };
}

export const initialState: InitialState = {
  authenticated: false,
  credentials: {},
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
    default:
      return state;
  }
}
