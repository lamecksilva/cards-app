import axios from 'axios';

import {
  REGISTER_USER_LOADING,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
} from './actionsTypes';

export const registerUser = (data, history) => (dispatch) => {
  dispatch({
    type: REGISTER_USER_LOADING,
  });

  axios
    .post('/api/users/register', data)
    .then((response) => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
      });
      console.log(response.data);

      history.push('/');
    })
    .catch((error) => {
      console.log(error.response);

      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: error.response.data.errors,
      });
    });
};
