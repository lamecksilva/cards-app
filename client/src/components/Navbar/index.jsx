import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import useStyles from './styles';

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component={Link} to="/" className={classes.title}>
            Cards App
          </Typography>
          <Button color="inherit" className={classes.createCard} component={Link} to="/">
            Criar Card
          </Button>
          <Button color="inherit" className={classes.link} component={Link} to="/register">
            Cadastrar-se
          </Button>
          <Button color="inherit" className={classes.link} component={Link} to="/">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
