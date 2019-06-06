import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link';

import useStyles from './styles';

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cards App</Typography>
          <Button color="inherit" className={classes.mrAuto} component={Link} to="/">
            Criar Card
          </Button>
          <Button color="inherit" component={Link} to="/">
            Cadastrar-se
          </Button>
          <Button color="inherit" component={Link} to="/">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
