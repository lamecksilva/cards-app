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

class Register extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Paper className={classes.root}>
          <Typography variant="h4" component="h5" className={classes.title}>
            Cadastrar-se
          </Typography>

          <Grid container className={classes.formGridContainer}>
            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Email</InputLabel>
                <Input />
                <FormHelperText>E.g: example@hotmail.com</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Nome</InputLabel>
                <Input />
                <FormHelperText>Seu nome de usuário</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Senha</InputLabel>
                <Input />
                <FormHelperText>Crie uma senha</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <FormControl fullWidth>
                <InputLabel>Confirmação de senha</InputLabel>
                <Input />
                <FormHelperText>Confirme sua senha</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.formGrid}>
              <Button color="secondary" variant="contained" fullWidth className="mt-3">
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
  const { errors } = state.register;
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Register));
