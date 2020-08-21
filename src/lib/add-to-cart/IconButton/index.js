import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartPlus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {fireEvent} from "@elderbraum/simple-event-bus";
import {events} from "./events";
import StyledButton from "../FormButton/style";

export class IconButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.submitEventListener = this.submitEventListener.bind(this);
  }


  async submitEventListener(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { product, qty } = this.props;

    const data = {
      product_id: product,
      qty
    };

    let res; // To handle the response in the try catch.
    try {
      res = await fetch(`${window.ajax_url}?action=add_product_to_cart`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "same-origin",
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
      response: body.data
    });

    this.setState({ loading: false });
  }

  render () {
    const { loading } = this.state;
    const { label, qty, product } = this.props;

    return (
      <form onSubmit={this.submitEventListener}>
        <input type='hidden' name='product_id' value={product} />
        <input type='hidden' name='add-to-cart' value={product} />
        <input type='hidden' name='quantity' value={qty} />

        <StyledButton type={'submit'} disabled={loading}>
          <FontAwesomeIcon
            icon={loading ? faSpinner : faCartPlus }
            spin={loading}
          />
        </StyledButton>
      </form>
    )

  }
}

IconButton.propTypes = {
  product: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,

  label: PropTypes.string,
}

export { events };
