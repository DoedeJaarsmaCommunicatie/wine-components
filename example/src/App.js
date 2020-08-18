import React from 'react'
import { Filter } from "@elderbraum/wine-components";
import { ThemeProvider, withTheme } from "styled-components";

const StyledFilterWrapper = withTheme(Filter.FilterWrapper);

const App = () => {
  return (
    <React.Fragment>
      <h1>Different types of wine components</h1>

      <h2>Homepage Filter</h2>

      <ThemeProvider theme={{
        background: '#69796b',
        bolded: false,
        rounded: false,
      }}>
        <StyledFilterWrapper title={'Ik ben op zoek naar'} defaultButton={true}>
          <Filter.SelectWrapper key={'category'} chevron={true} selected={'hidden-2'} paramName={'category'} placeholder={'In categorie'}>
            <Filter.OptionWrapper paramName={'category'} target={'hidden-1'} key={'hidden-1'}>hidden 1?</Filter.OptionWrapper>
            <Filter.OptionWrapper paramName={'category'} target={'hidden-2'} key={'hidden-2'}>hidden 2?</Filter.OptionWrapper>
            <Filter.OptionWrapper paramName={'category'} target={'hidden-3'} key={'hidden-3'}>hidden 3?</Filter.OptionWrapper>
            <Filter.OptionWrapper paramName={'category'} target={'hidden-4'} key={'hidden-4'}>hidden 4?</Filter.OptionWrapper>
          </Filter.SelectWrapper>

          <Filter.SelectWrapper key={'price'} chevron={true} selected={'hidden-2'} paramName={'price'} placeholder={'Voor prijs'}>
            <Filter.OptionWrapper paramName={'price'} target={'hidden-1'} key={'hidden-1'}>hidden 1?</Filter.OptionWrapper>
            <Filter.OptionWrapper paramName={'price'} target={'hidden-2'} key={'hidden-2'}>hidden 2?</Filter.OptionWrapper>
            <Filter.OptionWrapper paramName={'price'} target={'hidden-3'} key={'hidden-3'}>hidden 3?</Filter.OptionWrapper>
            <Filter.OptionWrapper paramName={'price'} target={'hidden-4'} key={'hidden-4'}>hidden 4?</Filter.OptionWrapper>
          </Filter.SelectWrapper>
        </StyledFilterWrapper>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App;
