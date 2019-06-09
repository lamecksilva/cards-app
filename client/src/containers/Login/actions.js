import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_LOADING } from './actionTypes';
import setAuthToken from '../../utils/setAuthToken';

export const loginUser = data => (dispatch) => {
  dispatch({ type: LOGIN_USER_LOADING });

  axios
    .post('/api/users/login', data)
    .then((response) => {
      console.log(response.data);

      const { token } = response.data;

      localStorage.setItem('jwtToken', token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.response.data.errors,
      });
    });
};

export const setCurrentUser = decoded => ({
  type: LOGIN_USER_SUCCESS,
  payload: decoded,
});

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};
