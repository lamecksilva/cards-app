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
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import styles from './styles';
import CardItem from '@/components/CardItem';
import withTitle from '@/components/withTitle';
import { createCard } from './actions';

class CriarCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      image: null,
      date: Date.now(),
      imageFile: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleImageChange(e) {
    this.setState({ imageFile: e.target.files[0] });
    const reader = new FileReader();
    reader.onload = event => this.setState({ image: event.target.result });
    reader.readAsDataURL(e.target.files[0]);
  }

  handleSubmit(e) {
    const { history } = this.props;
    const formData = new FormData();

    console.log(this.state);

    formData.append('image', this.state.imageFile);
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('user', this.props.user._id);

    this.props.createCard(formData, history);
  }

  render() {
    const {
      classes, user, loading, errors,
    } = this.props;
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
                  <Input onChange={this.handleImageChange} name="image" type="file" />
                  <FormHelperText>
                    {Boolean(errors.image) === true ? errors.image : 'Selecione a imagem do card'}
                  </FormHelperText>
                </FormControl>

                <Button
                  color="secondary"
                  variant="contained"
                  className="mt-3"
                  fullWidth
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

            <Grid xs={12} sm={6} item>
              <Typography component="h4" variant="h5" align="center" className="mt-3 mb-3">
                Live preview
              </Typography>

              <Grid item xs={12} sm={8} className={classes.cardContainer}>
                <CardItem create user={user} data={this.state} image={this.state.image} />
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
  const { errors, loading } = state.CriarCard;

  return { user, errors, loading };
};

const mapDispatchToProps = {
  createCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles, { withTheme: true })(withTitle({ component: CriarCard, title: 'Criar Card' })),
);
