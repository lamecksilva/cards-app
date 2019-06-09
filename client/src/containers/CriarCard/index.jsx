import React, { Component } from 'react';
import {
  Typography,
  Container,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Divider,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import styles from './styles';
import CardItem from '../../components/CardItem';

class CriarCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      image: null,
      date: Date.now(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    console.log(this.state);
  }

  render() {
    const { classes, user } = this.props;
    const errors = {};
    return (
      <Container>
        <Paper className={classes.root}>
          <Typography component="h4" variant="h3" align="center" className="mt-3 mb-3">
            Criar Card
          </Typography>

          <Divider className={classes.divider} />

          <Grid container>
            <Grid xs={12} sm={6} item>
              <Typography component="h4" variant="h5" align="center" className="mt-3 mb-3">
                Inserir Dados
              </Typography>

              <Grid xs={12} sm={8} item className={classes.formContainer}>
                <FormControl fullWidth error={Boolean(errors.title)}>
                  <InputLabel>Título</InputLabel>
                  <Input onChange={this.handleChange} name="title" type="text" />
                  <FormHelperText>
                    {Boolean(errors.title) === true ? errors.title : 'E.g: Awesome Card'}
                  </FormHelperText>
                </FormControl>

                <FormControl fullWidth error={Boolean(errors.description)}>
                  <InputLabel>Descrição</InputLabel>
                  <Input onChange={this.handleChange} name="description" type="text" multiline />
                  <FormHelperText>
                    {Boolean(errors.description) === true
                      ? errors.description
                      : 'E.g: Awesome Description here'}
                  </FormHelperText>
                </FormControl>

                <FormControl fullWidth error={Boolean(errors.image)}>
                  <InputLabel>Imagem</InputLabel>
                  <Input onChange={this.handleChange} name="image" type="file" />
                </FormControl>

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

            <Grid xs={12} sm={6} item>
              <Typography component="h4" variant="h5" align="center" className="mt-3 mb-3">
                Live preview
              </Typography>

              <Grid item xs={12} sm={8} className={classes.cardContainer}>
                <CardItem user={user} data={this.state} />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.Login;

  return { user };
};

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CriarCard));
