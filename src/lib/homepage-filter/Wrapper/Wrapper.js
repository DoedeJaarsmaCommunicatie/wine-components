import React from 'react';
import PropTypes from 'prop-types';
import { StyledFilterWrapper, StyledSearchTitle, StyledSubmitButton, theme as defaultTheme } from "../style";
import {ThemeProvider} from "styled-components";
import {listenEvent} from "@elderbraum/simple-event-bus";
import {events} from "../events";

export class FilterWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      searchParams: [],
    }
  }

  componentDidMount() {
    listenEvent(events.FILTER.SELECT_SET, ({ detail }) => {
      const { param, value } = detail;
      let { searchParams } = this.state;

      if (searchParams.length === 0) {
        searchParams.push({
          param,
          value
        });
      } else {
        searchParams = searchParams.filter(item => item.param !== param);

        searchParams.push({
          param,
          value
        });
      }

      this.setState({
        searchParams
      });
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const { searchParams } = this.state;

    const baseUrl = '/winkel/';
    const urlSearchParams = new URLSearchParams();

    for (let option of searchParams) {
      urlSearchParams.append(option.param, option.value);
    }


    window.location.href = baseUrl + urlSearchParams.toString();
  }

  render() {
    const { children, title, defaultButton, theme } = this.props;
    return (
      <React.StrictMode>
        <ThemeProvider theme={{...defaultTheme, ...theme }}>
          <StyledFilterWrapper className={'homepage__filter'}>
            <StyledSearchTitle className={'homepage__filter--title'}>{title}</StyledSearchTitle>
            {children}
            {defaultButton && (
              <StyledSubmitButton onClick={this.submitHandler} type={'button'} role={'button'} className={'homepage__filter--submit'} >
                Toon resultaat
              </StyledSubmitButton>
            )}
          </StyledFilterWrapper>
        </ThemeProvider>
      </React.StrictMode>
    )
  }
}

FilterWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  defaultButton: PropTypes.bool
}
