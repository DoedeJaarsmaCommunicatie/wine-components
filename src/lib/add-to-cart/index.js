import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fireEvent } from '@elderbraum/simple-event-bus';
import StyledButton from './style';
import { events } from './events';

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.classList = this.classList.bind(this);
    this.submitEventListener = this.submitEventListener.bind(this);
    this.state = {
      loading: false,
    };
  }

  classList() {
    const classes = this.props.classes ?? [];

    return classes.join(' ');
  }

  async submitEventListener(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const data = {
      product_id: this.props.product,
      qty: this.props.amount,
    };

    let res;
    try {
      res = await fetch(`${window.ajax_url}?action=add_product_to_cart`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'same-origin',
      });
    } catch (e) {
      if (e.name !== 'AbortError') {
        this.setState({ loading: false });
        fireEvent(events.PRODUCT.NOT_ADDED_TO_CART, {
          request: data,
          exception: e,
        });
        return;
      }
    }

    const body = await res.json();
    fireEvent(events.PRODUCT.ADDED_TO_CART, {
      request: data,
      response: body.data,
    });

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { label, amount, product } = this.props;

    return (
      <form className={this.classList()} onSubmit={this.submitEventListener}>
        <input type='hidden' name='product_id' value={product} />
        <input type='hidden' name='quantity' value={amount} />
        <StyledButton type='submit' disabled={loading}>
          {label}
          <FontAwesomeIcon
            icon={loading ? faSpinner : faPlus}
            spin={loading}
            style={{ marginLeft: '.5rem' }}
          />
        </StyledButton>
      </form>
    );
  }
}

Form.propTypes = {
  amount: PropTypes.number.isRequired,
  product: PropTypes.number.isRequired,

  label: PropTypes.string,
  icon: PropTypes.oneOf(['box', 'wine-bottle']),
  classes: PropTypes.array,
};
