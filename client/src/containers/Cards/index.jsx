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
        <Grid container spacing={4}>
          {this.props.cards.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <CardItem key={item._id} data={item} user={item.user} />
            </Grid>
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
