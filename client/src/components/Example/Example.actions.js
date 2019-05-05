const actionExample = () => (dispatch) => {
  console.log('Example Action');

  dispatch({
    type: 'TOGGLE',
  });
};

export { actionExample };
