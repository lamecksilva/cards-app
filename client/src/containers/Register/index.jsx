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
} from '@material-ui/core';
import { connect } from 'react-redux';

import styles from './styles';
import { registerUser } from './actions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
    const data = { ...this.state };

    this.props.registerUser(data, history);
  }

  render() {
    const { classes, errors } = this.props;
    return (
      <Container>
        <Paper className={classes.root}>
          <Typography variant="h4" component="h5" className={classes.title}>
            Cadastrar-se
          </Typography>

          <Grid container className={classes.formGridContainer}>
            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Nome</InputLabel>
                <Input onChange={this.handleChange} name="name" />
                <FormHelperText>Seu nome de usuário</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Email</InputLabel>
                <Input onChange={this.handleChange} name="email" />
                <FormHelperText>E.g: example@hotmail.com</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Senha</InputLabel>
                <Input onChange={this.handleChange} name="password" />
                <FormHelperText>Crie uma senha</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Confirmação de senha</InputLabel>
                <Input onChange={this.handleChange} name="password2" />
                <FormHelperText>Confirme sua senha</FormHelperText>
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
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { errors } = state.Register;

  return { errors };
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Register));
