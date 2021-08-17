import { CLEAR_MESSAGE, SET_LOADING, SET_INVITE, SET_MESSAGE } from 'redux/types/ui';

enum Type {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface UIState {
  show: boolean;
  type: Type;
  message: string;
  loading: boolean;
  teamInvite: {
    invited: boolean;
    image: string;
    name: string;
    id: string;
    invitationId?: string;
  };
}

export const initialState: UIState = {
  show: false,
  type: Type.SUCCESS,
  message: '',
  loading: false,
  teamInvite: {
    invited: false,
    image: '',
    name: '',
    id: '',
    invitationId: '',
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: any) {
  switch (action.type) {
    case CLEAR_MESSAGE:
      return initialState;
    case SET_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_INVITE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
