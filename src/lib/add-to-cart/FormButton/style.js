import styled, { css, withTheme } from 'styled-components';
import { darken } from 'polished';

export const primary = '#c96464';
export const secondary = '#9fd6d3';
export const white = '#ffffff';
export const blue = '#05597c';

export const StyledButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.25rem;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.borderColor};
  transition: all 225ms ease;
  cursor: pointer;

  ${(props) =>
    props.theme.outlined
      ? css`
          background: transparent;
          color: ${(props) => props.theme.background};

          &:hover {
            background: ${(props) => props.theme.background};
            color: ${(props) => props.theme.color};
          }
        `
      : css`
          background: ${(props) => props.theme.background};
          color: ${(props) => props.theme.color};

          &:hover {
            background: ${(props) => darken(0.2, props.theme.background)};
          }
        `}
`;

StyledButton.defaultProps = {
  theme: {
    background: primary,
    color: white,
    borderColor: primary,
    outlined: false,
  },
};

export default withTheme(StyledButton);
