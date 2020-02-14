import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormInput, CheckBox, SocialButtons } from 'components';
import { BLUE_700, GRAY_900, GRAY_TEXT } from 'styles/colors';
import { Row, TinyText } from 'styles/primitives';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 480px;
  min-height: 206px;
  padding: 24px 40px;
  background-color: ${GRAY_900};
  border-radius: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledSocialButtons = styled((props: any) => <SocialButtons {...props} />)`
  margin: 16px 0;
`;

export const StyledFormInput = styled((props: any) => <FormInput {...props} />)`
  width: 400px;
`;

export const GreyText = styled(TinyText)`
  color: ${GRAY_TEXT};
`;

export const StyledCheckbox = styled((props: any) => <CheckBox {...props} />)`
  margin: 0 6px 0 2px;
`;

export const Remember = styled.span`
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
  color: ${BLUE_700};
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  margin-right: 16px;
  color: ${GRAY_TEXT};
`;

export const WideRow = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;

export const Description = styled(GreyText)`
  margin-top: 8px;
  padding: 0 16px;
  text-align: center;
`;
