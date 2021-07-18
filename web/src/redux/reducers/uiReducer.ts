import { CLEAR_MESSAGE, LOADING_UI, SET_MESSAGE } from 'redux/types/ui';

enum Type {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

interface InitialState {
  show: boolean;
  type: Type;
  message: string;
  loading: boolean;
}

export const initialState: InitialState = {
  show: false,
  type: Type.SUCCESS,
  message: '',
  loading: false,
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
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
