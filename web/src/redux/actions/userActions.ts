import axios from 'axios';
import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_CODE,
} from '../types/user';

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/api/auth/v1/login', userData)
    .then((res) => {
      const token = res.data.authToken;
      const refreshToken = res.data.refreshToken;
      localStorage.setItem('token', token); //setting token to local storage
      localStorage.setItem('refreshToken', refreshToken);
      axios.defaults.headers.common['P-Token'] = token; //setting authorize token to header in axios
      axios.defaults.headers.common['P-Refresh-Token'] = refreshToken;
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); //redirecting to index page after login success
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
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
      if (res.status === 200) {
        dispatch({
          type: SET_CODE,
          payload: res.data,
        });
        dispatch({ type: CLEAR_ERRORS });
        return;
      }
      dispatch({
        type: SET_ERRORS,
        payload: res.data.message,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.message,
      });
    });
};
