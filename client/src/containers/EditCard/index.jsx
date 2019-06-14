import React, { Component } from 'react';
import {
  Container,
  Paper,
  Typography,
  withStyles,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';

import styles from './styles';
import CardItem from '../../components/CardItem';
import { getCardById } from './actions';

class EditCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      image: '',
    };
  }

  componentDidMount(){
    this.props.getCardById(this.props.match.params.id)
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
    e.preventDefault();

    console.log(this.state);
  }

  render() {
    const { classes, user } = this.props;
    const errors = {};
    return (
      <Container>
        <Paper className={classes.root}>
          <Typography component="h4" variant="h3" align="center" className="mt-3 mb-3">
            Editar Card
          </Typography>

          <Divider className={classes.divider} />

          <Grid container>
            <Grid sm={12} sm={6} item>
              <Typography component="h4" variant="h5" align="center" className="mt-3 mb-3">
                Alterar Dados
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

                <Button color="secondary" variant="contained" fullWidth onClick={this.handleSubmit}>
                  Confirmar
                </Button>
              </Grid>
            </Grid>

            <Grid xs={12} sm={6} item>
              <Typography component="h4" variant="h5" align="center" className="mt-3 mb-3">
                Live preview
              </Typography>

              <Grid item xs={12} sm={8} className={classes.cardContainer}>
                <CardItem user={user} data={this.state} image={this.state.image} />
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

  return {
    user,
  };
};

const mapDispatchToProps = {
  getCardById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(EditCard));
