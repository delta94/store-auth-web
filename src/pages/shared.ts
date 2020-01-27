import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, CheckBox, SocialButtons, DisplayNameInput } from 'components';
import { BLUE_TEXT, BACKGROUND_GREY2, TEXT_GREY } from 'styles/colors';
import { Button, Row, TinyText } from 'styles/primitives';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 480px;
  padding: 24px 40px;
  background-color: ${BACKGROUND_GREY2};
  border-radius: 8px;
`;

export const StyledSocialButtons = styled(SocialButtons)`
  margin: 16px 0;
`;

export const StyledButton = styled(Button)`
  margin: 24px 0 16px 0;
  padding: 14px 24px;
  text-transform: uppercase;
`;

export const StyledInput = styled(Input)`
  width: 400px;
`;

export const StyledDisplayNameInput = styled(DisplayNameInput)`
  width: 400px;
`;

export const GreyText = styled(TinyText)`
  color: ${TEXT_GREY};
`;

export const StyledCheckbox = styled(CheckBox)`
  margin: 0 6px 0 2px;
`;

export const Remember = styled.label`
  display: inline-flex;
  align-items: center;
  color: white;
`;

export const TermsAgree = styled(TinyText)`
  display: inline-flex;
  width: 100%;
  color: white;
`;

export const BlueLink = styled(Link)`
  color: ${BLUE_TEXT};
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  margin-right: 16px;
  color: ${TEXT_GREY};
`;

export const Privacy = styled(Row)`
  margin-top: 16px;
`;

export const WideRow = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;
