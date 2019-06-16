import React from 'react';
import TitleComponent from '../TitleComponent';

const withTitle = ({ component: Component, title }) => class Title extends Component {
  render() {
    return (
      <React.Fragment>
        <TitleComponent title={title} />
        <Component {...this.props} />
      </React.Fragment>
    );
  }
};

export default withTitle;
