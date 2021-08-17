import axios from 'axios';
import Cookie from 'js-cookie';
import { SET_LOADING, SET_MESSAGE } from 'redux/types/ui';
import { SET_PROFILE, SET_UNAUTHENTICATED, SET_CODE, SET_USER } from '../types/user';

export const setUser = (userData: any) => (dispatch: any) => {
  dispatch({
    type: SET_USER,
    payload: {
      user: userData,
    },
  });
};

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  axios
    .post('/api/auth/v1/login', userData)
    .then(() => {
      axios.defaults.headers.common['P-Token'] = Cookie.get('P-Token'); //setting authorize token to header in axios
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
    .then(() => {
      axios.defaults.headers.common['P-Token'] = Cookie.get('P-Token'); //setting authorize token to header in axios
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

export const logoutUser = () => (dispatch: any) => {
  Cookie.remove('P-Token');
  delete axios.defaults.headers.common['P-Token'];
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

export const getProfile = () => (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  axios
    .get('/api/profile/v1/')
    .then((res) => {
      if (res.data !== null) {
        dispatch({
          type: SET_PROFILE,
          payload: res.data,
          profileCreated: true,
        });
      } else {
        dispatch({
          type: SET_PROFILE,
          profileCreated: false,
        });
      }
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    })
    .catch((err) => console.error(err));
};

export const createProfile = (data: any) => (dispatch: any) => {
  axios.post('/api/profile/v1', data).then((res) => {
    dispatch({
      type: SET_MESSAGE,
      payload: {
        show: true,
        type: 'success',
        message: res.data.message,
      },
    });
    dispatch({
      type: SET_PROFILE,
      payload: res.data.profile,
      profileCreated: true,
    });
  });
};
