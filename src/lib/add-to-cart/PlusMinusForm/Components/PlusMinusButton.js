import React from 'react';
import PropTypes from 'prop-types';
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StyledPlusMinusButton} from "../style";

export class PlusMinusButton extends React.Component {
  constructor(props) {
    super(props);

    this.getIcon = this.getIcon.bind(this);
  }

  getIcon() {
    const { icon } = this.props;
    if (icon === 'plus') {
      return faPlus;
    }

    return faMinus
  }

  render() {
    return (
      <StyledPlusMinusButton onClick={this.props.clickHandler} type={"button"} left={this.props.icon !== 'plus'} right={this.props.icon === 'plus'} >
        <FontAwesomeIcon icon={this.getIcon()} />
      </StyledPlusMinusButton>
    )
  }
}

PlusMinusButton.defaultProps = {
  icon: 'plus'
}

PlusMinusButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.oneOf(['plus', 'min']),
}
