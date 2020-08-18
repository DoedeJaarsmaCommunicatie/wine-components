import React from 'react';
import PropTypes from 'prop-types';
import {fireEvent} from "@elderbraum/simple-event-bus";
import {events} from "../events";
import {StyledOptionWrapper} from "../style";

export class OptionWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    fireEvent(events.FILTER.OPTION_CLICKED, {
      key: this.props.target,
      paramName: this.props.paramName
    });
  }

  render () {
    return (
      <StyledOptionWrapper onClick={this.clickHandler}>
        {this.props.children}
      </StyledOptionWrapper>
    )
  }
}

OptionWrapper.propTypes = {
  target: PropTypes.string.isRequired,
  paramName: PropTypes.string.isRequired,
};
