import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import {
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';

import styles from './styles';
import { loginUser } from './actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { history } = this.props;

    this.props.loginUser(this.state);
  }

  render() {
    const { classes, errors, loading } = this.props;
    return (
      <Container>
        <Paper className={classes.root}>
          <Typography variant="h4" component="h5" className={classes.title}>
            Login
          </Typography>

          <Grid container className={classes.formGridContainer}>
            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth error={Boolean(errors.email)}>
                <InputLabel>Email</InputLabel>
                <Input onChange={this.handleChange} name="email" />
                <FormHelperText>
                  {Boolean(errors.email) === true ? errors.email : 'E.g: example@hotmail.com'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth error={Boolean(errors.password)}>
                <InputLabel>Senha</InputLabel>
                <Input onChange={this.handleChange} name="password" type="password" />
                <FormHelperText>
                  {Boolean(errors.password) === true ? errors.password : 'Digite sua senha'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                className="mt-3"
                onClick={this.handleSubmit}
              >
                {loading === true ? (
                  <Grid container direction="row" justify="center">
                    <Typography>Confirmar</Typography>
                    <CircularProgress size={25} className="ml-2" color="inherit" />
                  </Grid>
                ) : (
                  <Typography>Confirmar</Typography>
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { errors, loading } = state.Login;

  return { errors, loading };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Login));
