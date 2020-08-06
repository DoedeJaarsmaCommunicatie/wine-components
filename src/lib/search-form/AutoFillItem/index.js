import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { AutoFillWrapper } from '../style';

export class AutoFillItem extends Component {
  self = createRef();

  render() {
    const { res } = this.props;

    return (
      <AutoFillWrapper
        href={`/?p=${res.ID}`}
        key={res.ID}
        className={['search-autofill-result', `${res.post_type}-result`,].join(
          ' '
        )}
      >
        <h3 title={res.post_title} className='result-title'>
          {res.post_title}
        </h3>
      </AutoFillWrapper>
    );
  }
}

AutoFillItem.propTypes = {
  res: PropTypes.shape({
    ID: PropTypes.number.isRequired,
    post_type: PropTypes.string.isRequired,
    post_title: PropTypes.string.isRequired,
  }),
  focused: PropTypes.bool,
};
