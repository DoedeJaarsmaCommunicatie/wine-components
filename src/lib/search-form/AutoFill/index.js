import React, { Component } from 'react';
import { AutoFillItem } from '../AutoFillItem';
import PropTypes from 'prop-types';
import { AutoFillWrapper } from '../style';

export class AutoFill extends Component {
  render() {
    const { results, keyDownEvent } = this.props;

    if (results.length === 0) {
      return '';
    }

    return (
      <AutoFillWrapper className='search-auto-fill'>
        <nav>
          {results.map((res, index) => (
            <AutoFillItem res={res} keyDownEvent={keyDownEvent} />
          ))}
        </nav>
      </AutoFillWrapper>
    );
  }
}

AutoFill.propTypes = {
  results: PropTypes.array,
  cursor: PropTypes.number,
  keyDownEvent: PropTypes.func,
};
