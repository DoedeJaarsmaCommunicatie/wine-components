import React from 'react'

import '@elderbraum/wine-components/dist/index.css'
import { SearchForm } from "@elderbraum/wine-components";

const formTheme = {
  input: {
    color: '#1c413f',
  },
  border: true,
}

const App = () => {
  return <SearchForm action={'search-items'} theme={formTheme}/>
}

export default App
