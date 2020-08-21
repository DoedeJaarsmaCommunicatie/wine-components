import React from 'react'
import { PlusMinusForm } from "@elderbraum/wine-components";

const App = () => {
  return (
    <React.Fragment>
      <h1>Different types of wine components</h1>

      <h2>Add to Cart button</h2>

      <PlusMinusForm.PlusMinus product={9000} theme={{
        background: '#f93',
        color: '#fff'
      }} />
    </React.Fragment>
  )
}

export default App;
