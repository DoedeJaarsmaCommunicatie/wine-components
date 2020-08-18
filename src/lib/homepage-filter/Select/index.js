import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {StyledSelect, StyledSelectItemWrapper} from "../style";
import {fireEvent, listenEvent} from "@elderbraum/simple-event-bus";
import {events} from "../events";

export class SelectWrapper extends React.Component {
  childWrapper = React.createRef();

  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
    this.getSelected = this.getSelected.bind(this);

    this.state = {
      selected: '',
    }
  }

  componentDidMount() {
    listenEvent(events.FILTER.OPTION_CLICKED, ({detail}) => {
      if (detail.paramName !== this.props.paramName) {
        return;
      }

      this.setState({
        selected: detail.key,
      });

      fireEvent(events.FILTER.SELECT_SET, {
        param: this.props.paramName,
        value: detail.key,
      })
    })
  }

  clickHandler() {
    this.childWrapper.current.classList.toggle('active');
  }

  getSelected() {
    const { children } = this.props;
    const { selected } = this.state;
    if (!selected) {
      return this.props.placeholder;
    }

    return children.filter(child => child.key === selected )[0].props.children.toString() || '';
  }

  render() {
    const{ children, chevron } = this.props;

    return (
      <StyledSelect onClick={this.clickHandler}>
        { this.getSelected() }
        <StyledSelectItemWrapper ref={this.childWrapper}>
          {children}
        </StyledSelectItemWrapper>
        {chevron && (
          <FontAwesomeIcon icon={faChevronDown} style={{ position: 'absolute', right: '2rem', pointerEvents: 'none' }} />
        )}
      </StyledSelect>
    );
  }
}

SelectWrapper.propTypes = {
  chevron: PropTypes.bool.isRequired,
  paramName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}
