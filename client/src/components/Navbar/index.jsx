import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  withStyles, IconButton, Menu, MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { logoutUser } from '@/containers/Login/actions';
import styles from './styles';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.onLogoutClick = this.onLogoutClick.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
    this.handleClose()
  }

  handleMenu(e) {
    e.preventDefault();

    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes, auth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component={Link} to="/" className={classes.title}>
              Cards App
            </Typography>
            <Button
              color="inherit"
              className={classes.createCard}
              component={Link}
              to="/criar-card"
            >
              Criar Card
            </Button>
            {auth.isAuthenticated ? (
              <div>
                <IconButton onClick={this.handleMenu}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button color="inherit" className={classes.link} component={Link} to="/register">
                  Cadastrar-se
                </Button>
                <Button color="inherit" className={classes.link} component={Link} to="/login">
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const auth = state.Login;

  return {
    auth,
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Navbar));
