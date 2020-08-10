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
      searchTerm: null,
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
    try {
      if (!this.form.current) {
        return;
      }

      if (this.form.current.contains(e.target)) {
        return;
      }
    } catch {}

    this.setState({
      show_results: false,
    });
  }

  async handleSearchInput(e) {
    const { action } = this.props;
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
        await fetch(window.ajax_url + `?action=${action}&s=${value}`, {
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
      searchTerm: value,
    });
  }

  render() {
    const { show_results, results, loading, cursor, searchTerm } = this.state;
    const theme = merge(defaultTheme, this.props.theme);

    return (
      <ThemeProvider theme={theme}>
        <SearchApp
          className='search-app'
          ref={this.form}
          action='/'
          method='GET'
        >
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
              searchTerm={searchTerm}
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
