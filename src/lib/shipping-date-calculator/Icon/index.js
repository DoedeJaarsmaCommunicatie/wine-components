import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export class ShippingIcon extends React.Component {
  constructor(props) {
    super(props);
    this.getShippingIcon = this.getShippingIcon.bind(this);
  }

  getShippingIcon() {
    return this.props.inStock ? faCheck : faExclamationTriangle;
  }

  render() {
    return <FontAwesomeIcon icon={this.getShippingIcon()} />;
  }
}

ShippingIcon.propTypes = {
  inStock: PropTypes.bool.isRequired,
};
