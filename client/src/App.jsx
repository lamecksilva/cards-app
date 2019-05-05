import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Example from './components/Example';

// Componente mais acima da aplicação, que será renderizado diretamente na div "root"
const App = () => (
  <Provider store={store}>
    <Example />
  </Provider>
);

export default App;
