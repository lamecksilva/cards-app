import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import store from './redux/store';
import theme from './utils/theme';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './containers/Login/actions';

import Example from './containers/Example';
import Cards from './containers/Cards';
import Navbar from './components/Navbar';
import Register from './containers/Register';
import Login from './containers/Login';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

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
        <Route path="/login" exact component={Login} />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
