import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Example from './containers/Example';
import Cards from './containers/Cards';

// Componente mais acima da aplicação, que será renderizado diretamente na div "root"
const App = () => (
  // O componente "Provider" faz com que a store do Redux seja acessivel em todos os
  // componentes encadeados, apenas fazendo uso da função "connect()"
  <Provider store={store}>
    {/* <Example /> */}
    <Cards />
  </Provider>
);

export default App;
