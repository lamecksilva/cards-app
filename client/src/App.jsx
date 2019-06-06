import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import store from './redux/store';
import theme from './utils/theme';

import Example from './containers/Example';
import Cards from './containers/Cards';
import Navbar from './components/Navbar';
import Register from './containers/Register';

// Componente mais acima da aplicação, que será renderizado diretamente na div "root"
const App = () => (
  // O componente "Provider" faz com que a store do Redux seja acessivel em todos os
  // componentes encadeados, apenas fazendo uso da função "connect()"
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Route path="/" exact component={Cards} />
        <Route path="/register" exact component={Register} />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
