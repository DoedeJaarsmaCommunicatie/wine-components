import styled, { css } from 'styled-components';

export const SearchApp = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  background: transparent;
  padding: ${(props) => props.theme.padding};

  input {
    all: unset;
    background: ${(props) => props.theme.input.background};
    color: ${(props) => props.theme.input.color};
    &::placeholder {
      opacity: ${(props) => props.theme.input.placeholder.opacity};
    }
  }

  button {
    all: unset;
    cursor: pointer;
  }

  ${(props) =>
    props.theme.border &&
    css({
      border: `1px solid ${
        props.theme.border.color || props.theme.input.color
      }`,
      borderRadius: `${props.theme.border.radius || '4px'}`,
    })}
`;

export const AutoFillWrapper = styled.a`
  display: block;
  margin: 0.5rem 0;
  padding: 1rem;
  pointer-events: all;

  .result-title {
    font-weight: bold;
  }

  &:hover,
  &:focus {
    background: #1c413f;
    color: #ffffff;
  }
`;

export const theme = {
  input: {
    color: 'currentColor',
    background: 'transparent',
    placeholder: {
      opacity: '0.8',
    },
  },
  border: false,
  padding: '.5rem',
};

SearchApp.defaultProps = {
  theme,
};

AutoFillWrapper.defaultProps = {
  theme,
};