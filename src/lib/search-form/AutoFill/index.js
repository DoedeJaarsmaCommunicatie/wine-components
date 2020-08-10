import React, { Component } from 'react';
import { AutoFillItem } from '../AutoFillItem';
import PropTypes from 'prop-types';
import { AutoFillWrapper, FillItemWrapper } from '../style';

export class AutoFill extends Component {
  render() {
    const { results, keyDownEvent, searchTerm } = this.props;

    if (results.length === 0) {
      return '';
    }

    return (
      <AutoFillWrapper className='search-auto-fill'>
        <nav>
          {results.map((res, index) => (
            <AutoFillItem res={res} keyDownEvent={keyDownEvent} />
          ))}

          <FillItemWrapper href={`/?s=${searchTerm}`}>
            <h3 className='result-title'>Bekijke alle resultaten</h3>
          </FillItemWrapper>
        </nav>
      </AutoFillWrapper>
    );
  }
}

AutoFill.propTypes = {
  results: PropTypes.array,
  cursor: PropTypes.number,
  keyDownEvent: PropTypes.func,
  searchTerm: PropTypes.string,
};
