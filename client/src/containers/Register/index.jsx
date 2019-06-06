import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Container, Typography, Paper } from '@material-ui/core';

import styles from './styles';

class Register extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Cadastrar-se
          </Typography>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Register);
