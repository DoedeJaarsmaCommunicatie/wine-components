import React from 'react';
import PropTypes from 'prop-types';
import {StyledQuantityInput} from "../style";

export class QuantityInput extends React.Component {
  render() {
    return (
      <StyledQuantityInput
        type={'number'}
        value={this.props.qty}
        onChange={e => this.props.changeHandler(e.target.valueAsNumber)}
      />
    );
  }
}

QuantityInput.propTypes = {
  qty: PropTypes.number.isRequired,
  changeHandler: PropTypes.func.isRequired,
}
