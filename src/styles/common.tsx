import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormInput, CheckBox, SocialButtons, FormError } from 'components';
import { BLUE_400, GRAY_900, GRAY_TEXT, BLACK } from 'styles/colors';
import { Row, TinyText, Column, Button } from 'styles/primitives';

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

export const HideableWrapper = styled.div<{ hide?: boolean }>`
  display: ${({ hide }) => hide ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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

export const StyledGrayButton = styled(Button)`
  border: 1px solid ${GRAY_TEXT};
  min-height: 46px;
  margin: 24px 0 16px 0;
  text-transform: uppercase;
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

export const StyledFormError = styled((props: any) => <FormError {...props} />)`
  margin-bottom: 16px;
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
  color: ${BLUE_400};
  text-decoration: none;
`;

export const AuthSkip = styled.span`
  color: ${BLUE_400};
  cursor: pointer;
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

export const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: ${BLACK};
`;

export const Container = styled(Column)`
  align-items: center;
  max-width: 480px;
`;

export const ErrorIconWrapper = styled.div`
  max-height: 40px;
  margin: 0 auto 20px auto;
`;

export const ErrorTitle = styled.h1`
  margin:  0 0 12px 0;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: white;
`;

export const ErrorDescription = styled.h4`
  margin:  0;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  color: ${GRAY_TEXT};
`;
