import React from 'react';
import { connect } from 'react-redux';

import { actionExample } from './Example.actions';
import './Example.css';

const Example = props => (
  <div>
    <h2 className="example" onClick={props.actionExample}>
			Component for Example

    </h2>
    {props.isOnline === true ? <h6>True</h6> : <h6>False</h6>}
  </div>
);

const mapStateToProps = (state) => {
  const { isOnline } = state.example;

  return { isOnline };
};

const mapDispatchToProps = {
  actionExample,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Example);
