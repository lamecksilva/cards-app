import React, { Component } from 'react';
import { withStyles, Container, Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import { getCards } from './actions';
import styles from './styles';

import CardItem from '@/components/CardItem';

class Cards extends Component {
  componentDidMount() {
    this.props.getCards();
  }

  render() {
    return (
      <Container>
        <Grid container>
          {this.props.cards.map(item => (
            <CardItem key={item._id} data={item} user={item.user} />
          ))}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { cards } = state.Cards;

  return {
    cards,
  };
};

const mapDispatchToProps = {
  getCards,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Cards));
