import React, { FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BACKGROUND_GREY2, BLUE_TEXT, TEXT_GREY } from 'styles/colors';
import Header from 'components/Header';
import Input from 'components/Input';
import { passwordValidate, emailValidate } from 'helpers';
import CheckBox from 'components/CheckBox';
import { Link } from 'react-router-dom';
import { Button, Row, TinyText } from 'styles/primitives';
import SocialButtons from 'components/SocialButtons';

interface Props {
  className?: string;
}

const SignIn = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: {
      value: '',
      touched: false,
    },
    password: {
      value: '',
      touched: false,
    },
  });

  const handleErrorsChange = (field: string, value: string) => {
    setErrors({
      ...errors,
      [field]: {
        value,
        touched: true,
      },
    });
  };

  const isFormValid = Object.values(errors).every(({ value, touched }) => !value && touched);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form: any = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const remember = form.remember.checked;

    console.log({
      email, password, remember,
    });
  };

  return (
    <Wrapper className={className} onSubmit={handleSubmit}>
      <Header title={t('sign-in')} />
      <StyledSocialButtons />
      <StyledInput
        type="text"
        label={t('email')}
        name="email"
        error={errors.email.value}
        validate={emailValidate}
        onFieldErrorChange={handleErrorsChange}
      />
      <StyledInput
        type="password"
        label={t('password')}
        name="password"
        error={errors.password.value}
        validate={passwordValidate}
        onFieldErrorChange={handleErrorsChange}
      />

      <WideRow>
        <Remember>
          <StyledCheckbox checked={false} name="remember" />
          {t('remember')}
        </Remember>
        <TinyText>
          <BlueLink to="/forgot">
            {t('forgot-password')}?
          </BlueLink>
        </TinyText>
      </WideRow>

      <StyledButton disabled={!isFormValid} type="submit">
        {t('sign-in')}
      </StyledButton>

      <GreyText>
        {`${t('dont-have-account')}? `}
        <BlueLink to="sign-up">
          {t('sign-up')}
        </BlueLink>!
      </GreyText>

      <Privacy>
        <StyledLink to="/privacy-policy">
          <GreyText>
            {t('privacy-policy')}
          </GreyText>
        </StyledLink>
      </Privacy>
    </Wrapper>
  );
};

export default SignIn;

const Wrapper = styled.form`
  background-color: ${BACKGROUND_GREY2};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 24px 40px;
  width: 480px;
  /* min-height: 474px; */
  border-radius: 8px;
`;

const StyledSocialButtons = styled(SocialButtons)`
  margin: 16px 0;
`;

const StyledButton = styled(Button)`
  padding: 14px 24px;
  margin: 24px 0 16px 0;
  text-transform: uppercase;
`;

const WideRow = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 400px;
`;

const GreyText = styled(TinyText)`
  color: ${TEXT_GREY};
`;

const StyledCheckbox = styled(CheckBox)`
  margin: 0 6px 0 2px;
`;

const Remember = styled(TinyText)`
  display: inline-flex;
  color: white;
  align-items: center;
`;

const BlueLink = styled(Link)`
  color: ${BLUE_TEXT};
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  margin-right: 16px;
  color: ${TEXT_GREY};
`;

const Privacy = styled(Row)`
  margin-top: 16px;
`;
