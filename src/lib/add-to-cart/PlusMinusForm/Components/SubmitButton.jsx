import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {StyledSubmitButton} from "../style";

export class SubmitButton extends React.Component {
  render() {
    const { label } = this.props;
    return (
      <StyledSubmitButton type={"submit"}>
        {label}
        <FontAwesomeIcon icon={faShoppingCart} />
      </StyledSubmitButton>
    )
  }
}

SubmitButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.oneOf(['cart', 'cart-plus']),
}
