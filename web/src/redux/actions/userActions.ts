import axios from 'axios';
import { SET_MESSAGE } from 'redux/types/ui';
import { SET_USER, SET_UNAUTHENTICATED, LOADING_USER, SET_CODE } from '../types/user';

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  axios
    .post('/api/auth/v1/login', userData)
    .then((res) => {
      const token = res.data.authToken;
      const refreshToken = res.data.refreshToken;
      localStorage.setItem('token', token); //setting token to local storage
      localStorage.setItem('refreshToken', refreshToken);
      axios.defaults.headers.common['P-Token'] = token; //setting authorize token to header in axios
      axios.defaults.headers.common['P-Refresh-Token'] = refreshToken;
      dispatch({
        type: SET_MESSAGE,
        payload: {
          show: true,
          type: 'success',
          message: 'Logged in successfully!',
        },
      });
      history.push('/'); //redirecting to index page after login success
    })
    .catch((err) => {
      dispatch({
        type: SET_MESSAGE,
        payload: {
          show: true,
          type: 'error',
          message: err.response.data.message,
        },
      });
    });
};

export const createUser = (userData: any, history: any) => (dispatch: any) => {
  axios
    .post('/api/auth/v1/register', userData)
    .then((res) => {
      const token = res.data.authToken;
      const refreshToken = res.data.refreshToken;
      localStorage.setItem('token', token); //setting token to local storage
      localStorage.setItem('refreshToken', refreshToken);
      axios.defaults.headers.common['P-Token'] = token; //setting authorize token to header in axios
      axios.defaults.headers.common['P-Refresh-Token'] = refreshToken;
      dispatch({
        type: SET_MESSAGE,
        payload: {
          show: true,
          type: 'success',
          message: 'registerSuccess',
        },
      });
      history.push('/'); //redirecting to index page after login success
    })
    .catch((err) => {
      dispatch({
        type: SET_MESSAGE,
        payload: {
          show: true,
          type: 'error',
          message: err.response.data.message,
        },
      });
    });
};

export const getUserData = (data: any) => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  dispatch({
    type: SET_USER,
    payload: data,
  });
};

export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  delete axios.defaults.headers.common['P-Token'];
  delete axios.defaults.headers.common['P-Refresh-Token'];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = '/login'; //redirect to login page
};

export const requestNumber = (phoneNumber: string) => (dispatch: any) => {
  axios
    .post('/api/sms/v1', {
      number: phoneNumber,
    })
    .then((res) => {
      dispatch({
        type: SET_CODE,
        payload: {
          lastMessage: res.data._id,
          limited: false,
        },
      });
      dispatch({
        type: SET_MESSAGE,
        payload: {
          show: true,
          type: 'success',
          message: 'Success',
        },
      });
      return;
    })
    .catch((err) => {
      if (err.response.status === 400) {
        dispatch({
          type: SET_CODE,
          payload: {
            lastMessage: '',
            limited: true,
          },
        });
        return dispatch({
          type: SET_MESSAGE,
          payload: {
            message: err.response.data.message,
            show: true,
            type: 'warning',
          },
        });
      }
      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: err.response.data.message,
          show: true,
          type: 'error',
        },
      });
    });
};
