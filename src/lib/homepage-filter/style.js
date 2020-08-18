import styled, { css, withTheme } from 'styled-components';
import {darken} from "polished";

const FilterWrapper = styled.form`
  background: ${props => props.theme.background};
  padding: 15px 10px;
  text-align: center;
`;

const SearchTitle = styled.h3`
  all: unset;
  display: block;
  color: ${props => props.theme.color};
  margin-bottom: 10px;
  ${props => props.theme.rounded? css({
    fontWeight: 'bold',
  }): ''};
`;

const SubmitButton = styled.button`
  all: unset;
  display: block;
  background: hsl(0, 0%, 100%);
  color: hsl(0,0%,0%);
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  transition: all 325ms cubic-bezier(0.2, 0.4, 0, 0.8);
  ${props => props.theme.rounded? css({
    borderRadius: '4px',
  }): ''};

  &:hover {
    background: hsl(0, 0%, 0%);
    color: hsl(0, 0%, 100%);
  }
`;

const CustomSelect = styled.span`
  background: ${props => darken(0.1, props.theme.background)};
  ${props => props.theme.rounded? css({
    borderRadius: '4px',
  }): ''};
  height: 40px;
  position: relative;
  cursor: pointer;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: .5rem;
  color: ${props => props.theme.color};

  & .homepage__filter--select__items {
    display: none;

    &.active {
      display: block;
    }
  }
`;

const SelectItemWrapper = styled.div`
  display: none;
  position: absolute;
  top: calc(100% + .5rem);
  background: ${props => darken(0.1, props.theme.background)};
  ${props => props.theme.rounded? css({
    borderRadius: '4px',
  }): ''};
  width: 100%;
  z-index: 10;

  &.active {
    display: block;
  }
`;

const OptionWrapper = styled.span`
  display: block;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: .5rem;
  transition: all 225ms ease;
  color: ${props => props.theme.color};

  &:hover {
    color: ${props => darken(0.1, props.theme.color)};
  }
`;

export const theme = {
  background: 'hsl(30,100%,60%)',
  color: 'hsl(0,0%,100%)',
  rounded: false,
  bolded: true,
}

FilterWrapper.defaultProps = {
  theme
};

SearchTitle.defaultProps = {
  theme,
}

SubmitButton.defaultProps = {
  theme,
}

OptionWrapper.defaultProps = {
  theme,
}

export const StyledFilterWrapper = withTheme(FilterWrapper);
export const StyledSearchTitle = withTheme(SearchTitle);
export const StyledSubmitButton = withTheme(SubmitButton);
export const StyledSelect = withTheme(CustomSelect);
export const StyledSelectItemWrapper = withTheme(SelectItemWrapper);
export const StyledOptionWrapper = withTheme(OptionWrapper);
