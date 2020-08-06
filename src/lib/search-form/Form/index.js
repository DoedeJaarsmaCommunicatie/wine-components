import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AutoFill } from '../AutoFill';
import { SearchApp, theme as defaultTheme } from '../style';
import { ThemeProvider } from 'styled-components';
import merge from 'lodash/merge';

export class Form extends React.Component {
  form = React.createRef();
  abortControllers = [];

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      show_results: false,
      results: [],
      cursor: 0,
    };
    this.handleFocusEvent = this.handleFocusEvent.bind(this);
    this.hideSearchFill = this.hideSearchFill.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleFocusEvent(e) {
    this.setState({
      show_results: true,
    });
  }

  hideSearchFill(e) {
    if (!this.form.current) {
      return;
    }

    if (this.form.current.contains(e.target)) {
      return;
    }

    this.setState({
      show_results: false,
    });
  }

  async handleSearchInput(e) {
    this.setState({ loading: true });
    this.abortControllers.forEach((abortController) => abortController.abort());
    const abortController = new AbortController();
    const value = e.target.value;
    this.abortControllers.push(abortController);
    if (value === '' || value === null || !value) {
      return this.hideSearchFill();
    }

    let res;

    try {
      res = await (
        await fetch(window.ajax_url + `?action=search_results&s=${value}`, {
          signal: abortController.signal,
        })
      ).json();
    } catch {
      return;
    } // Signal aborted.

    this.setState({
      show_results: true,
      results: res.data.posts,
      loading: false,
    });
  }

  render() {
    const { show_results, results, loading, cursor, } = this.state;
    const theme = merge(defaultTheme, this.props.theme);

    return (
      <ThemeProvider theme={theme}>
        <SearchApp className='search-app'>
          <input
            placeholder='Zoek een product...'
            id='s'
            name='s'
            type='search'
            autoComplete='off'
            className='search-form-input'
            onFocus={this.handleFocusEvent}
            onBlur={this.hideSearchFill}
            onInput={this.handleSearchInput}
          />

          <button type='submit' className='search-button'>
            <FontAwesomeIcon
              icon={loading ? faSpinner : faSearch}
              spin={loading}
            />
          </button>

          {show_results && (
            <AutoFill
              results={results}
              keyDownEvent={this.keyDownEvent}
              cursor={cursor}
              className='search-auto-fill'
            />
          )}
        </SearchApp>
      </ThemeProvider>
    );
  }
}

Form.propTypes = {
  action: PropTypes.string.isRequired,
  theme: PropTypes.object,
};
