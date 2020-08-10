import React from 'react'

import '@elderbraum/wine-components/dist/index.css'
import { SearchForm, ShippingDateCalculator, AddToCartForm } from "@elderbraum/wine-components";
import {ThemeProvider, withTheme} from "styled-components";

const formTheme = {
  input: {
    color: '#1c413f',
  },
  border: true,
}

const StyledAddToCartForm = withTheme(AddToCartForm);

const App = () => {
  return (
    <React.Fragment>
      <h1>Different types of wine components</h1>

      <h2>A search form</h2>
      <SearchForm action={'search-items'} theme={formTheme}/>

      <h2>Shipping date</h2>
      <ShippingDateCalculator shippingDays={0} />

      <h2>Add to cart</h2>
      <ThemeProvider theme={{ background: '#c96464', color: '#fff', outlined: true }}>
        <StyledAddToCartForm amount={1} product={1} label={'Fles'} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
