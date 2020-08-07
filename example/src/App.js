import React from 'react'

import '@elderbraum/wine-components/dist/index.css'
import { SearchForm, ShippingDateCalculator } from "@elderbraum/wine-components";

const formTheme = {
  input: {
    color: '#1c413f',
  },
  border: true,
}

const App = () => {
  return (
    <React.Fragment>
      <h1>Different types of wine components</h1>

      <h2>A search form</h2>
      <SearchForm action={'search-items'} theme={formTheme}/>

      <h2>Shipping date</h2>
      <ShippingDateCalculator shippingDays={3} />
    </React.Fragment>
  )
}

export default App
