import axios from 'axios';

export const getCards = () => (dispatch) => {
  axios
    .get('/api/cards')
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.log(error));
};
