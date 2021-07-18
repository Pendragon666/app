// import axios from 'axios';
// import { LOADING_UI, SET_MESSAGE } from 'redux/types/ui';
// import { SET_USER, SET_UNAUTHENTICATED, LOADING_USER, SET_CODE } from '../types/user';

import { CLEAR_MESSAGE } from 'redux/types/ui';

// export const loginUser = (userData: any, history: any) => (dispatch: any) => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .post('/api/auth/v1/login', userData)
//     .then((res) => {
//       const token = res.data.authToken;
//       const refreshToken = res.data.refreshToken;
//       localStorage.setItem('token', token); //setting token to local storage
//       localStorage.setItem('refreshToken', refreshToken);
//       axios.defaults.headers.common['P-Token'] = token; //setting authorize token to header in axios
//       axios.defaults.headers.common['P-Refresh-Token'] = refreshToken;
//       dispatch({ type: SET_MESSAGE });
//       history.push('/'); //redirecting to index page after login success
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: SET_MESSAGE,
//         payload: err.response.data,
//       });
//     });
// };

export const clearMessage = () => (dispatch: any) => {
  dispatch({ type: CLEAR_MESSAGE });
};
