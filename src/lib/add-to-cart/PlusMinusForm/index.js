import React from 'react';
import PropTypes from 'prop-types';
import { events } from './events';
import {PlusMinusButton} from "./Components/PlusMinusButton";
import {QuantityInput} from "./Components/QuantityInput";
import {SubmitButton} from "./Components/SubmitButton";
import {fireEvent} from "@elderbraum/simple-event-bus";
import {ThemeProvider} from "styled-components";
import {defaultTheme} from "./style";

export class PlusMinusForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      qty: 1,
    }

    this.submitEventListener = this.submitEventListener.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
  }

  changeQuantity(mode = 'up') {
    const { qty } = this.state;
    const { minAmount, maxAmount, stepAmount } = this.props;
    if (mode === 'up') {
      if (qty + stepAmount <= maxAmount?? Number.POSITIVE_INFINITY) {
        this.setQuantity(qty + stepAmount);
        return;
      }

      this.setQuantity(maxAmount);
      return;
    }

    if (qty <= minAmount) {
      this.setQuantity(minAmount);
    }

    if (qty > stepAmount) {
      this.setQuantity(qty - stepAmount);
    }
  }

  setQuantity(newQuantity) {
    this.setState({qty: newQuantity});
  }

  async submitEventListener(e) {
    e.preventDefault();
    const { product } = this.props;
    const { qty } = this.state;
    this.setState({ loading: true });

    const data = {
      product_id: product,
      qty,
    }

    let res;
    try {
      res = await fetch(`${window.ajax_url}?action=add_product_to_cart`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "same-origin"
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
    const { product } = this.props;
    const { qty } = this.state;
    console.dir(this.props);

    return (
      <React.StrictMode>
        <ThemeProvider theme={{...defaultTheme, ...this.props.theme}}>
          <form onSubmit={this.submitEventListener}>
            <input type='hidden' name='product_id' value={product} />
            <input type='hidden' name='add-to-cart' value={product} />
            <input type='hidden' name='quantity' value={qty} />
            <section style={{ display: 'flex', marginBottom: '1rem' }}>
              <PlusMinusButton clickHandler={() => this.changeQuantity('down')} icon={"min"} />
              <QuantityInput qty={qty} changeHandler={this.setQuantity} />
              <PlusMinusButton clickHandler={() => this.changeQuantity('up')} />
            </section>
            <SubmitButton />
          </form>
        </ThemeProvider>
      </React.StrictMode>
    )
  }
}

PlusMinusForm.defaultProps = {
  minAmount: 1,
  stepAmount: 1,
  maxAmount: Infinity
}

PlusMinusForm.propTypes = {
  product: PropTypes.number.isRequired,
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  stepAmount: PropTypes.number,
}

export { events };
