import axios from 'axios';
import { CLEAR_MESSAGE, SET_INVITE, SET_LOADING, SET_MESSAGE } from 'redux/types/ui';

export const setLoading = (loading: boolean) => (dispatch: any) => dispatch({ type: SET_LOADING, payload: loading });

export const clearMessage = () => (dispatch: any) => {
  dispatch({ type: CLEAR_MESSAGE });
};

export const setInvite = (data: any) => (dispatch: any) => {
  dispatch({ type: SET_INVITE, payload: data });
};

export const respondToInvite = (teamId: string, accept: boolean) => (dispatch: any) => {
  axios
    .post(`/api/user/v1/${teamId}`, { accept })
    .then(() => {
      dispatch({
        type: SET_INVITE,
        payload: {
          invited: false,
          image: '',
          name: '',
          id: '',
          invitationId: '',
        },
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: err.response.data.message,
          show: true,
          type: 'error',
        },
      }),
    );
};
