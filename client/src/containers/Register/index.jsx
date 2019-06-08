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
} from '@material-ui/core';

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

          <Grid container>
            <Grid item xs={12} sm={8}>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input />
                <FormHelperText>E.g: example@hotmail.com</FormHelperText>
              </FormControl>
            </Grid>

            <FormControl>
              <InputLabel>Nome</InputLabel>
              <Input />
              <FormHelperText>Seu nome de usuário</FormHelperText>
            </FormControl>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Register);
