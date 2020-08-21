import styled, { css, withTheme } from 'styled-components';

const PlusMinusButton = styled.button`
  all: unset;
  padding: .5rem;
  transition: all 225ms ease;
  cursor: pointer;
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};

  ${props => props.left && css({
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px',
})}
  ${props => props.right && css({
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
})}
`;

const QuantityInput = styled.input`
  all: unset;
  appearance: textfield;
  text-align: center;
  border: 1px solid ${props => props.theme.borderColor};
`;

const SubmitButton = styled.button`
  all: unset;
  border: 4px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};
  cursor: pointer;
  border-radius: 4px;
  padding: .5rem;
  text-align:center;
  width: 100%;
`;

export const defaultTheme = {
  background: 'hsl(0,48%,59%)',
  color: 'hsl(0,0%,100%)',
  borderColor: 'hsl(0, 48%, 59%)',
}

QuantityInput.defaultProps = {
  theme: defaultTheme
}

PlusMinusButton.defaultProps = {
  theme: defaultTheme
}

SubmitButton.defaultProps = {
  theme: defaultTheme
}

export const StyledPlusMinusButton = withTheme(PlusMinusButton);
export const StyledQuantityInput = withTheme(QuantityInput);
export const StyledSubmitButton = withTheme(SubmitButton);
