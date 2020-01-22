import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BACKGROUND_GREY2, BLUE_TEXT, TEXT_GREY } from 'styles/colors';
import Header from 'components/Header';
import Input from 'components/Input';
import { passwordValidate, emailValidate } from 'helpers';
import CheckBox from 'components/CheckBox';
import { Link } from 'react-router-dom';
import { Button, Row } from 'styles/primitives';

interface Props {
  className?: string;
}

const SignIn = (props: Props) => {
  const { className } = props;
  // const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState({
    email: false,
    password: false,
  });
  const { t } = useTranslation();

  const handleFieldValidChange = (field: string, value: boolean) => {
    setValid({
      ...valid,
      [field]: value,
    });
  };

  const isFormValid = Object.values(valid).every(Boolean);

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
      <StyledInput
        type="text"
        label={t('email')}
        name="email"
        validate={emailValidate}
        onFieldValidChange={handleFieldValidChange}
        focus
      />
      <StyledInput
        type="password"
        label={t('password')}
        name="password"
        validate={passwordValidate}
        onFieldValidChange={handleFieldValidChange}
      />

      <WideRow>
        <Remember>
          <StyledCheckbox checked={false} name="remember" />
          {t('remember')}
        </Remember>
        <BlueLink to="/forgot">
          {t('forgot-password')}
        </BlueLink>
      </WideRow>

      <Button disabled={!isFormValid} type="submit">
        {t('signin-button')}
      </Button>

      <GreyText>
        {`${t('dont-have-account')}? `}
        <BlueLink to="sign-up">
          {t('signup')}
        </BlueLink>
      </GreyText>

      <Row>
        <GreyLink to="/privacy-policy">
          {t('privacy-policy')}
        </GreyLink>
        <GreyLink to="/qilin">
          {t('qilin')}
        </GreyLink>
        <GreyLink to="/user-agreement">
          {t('user-agreement')}
        </GreyLink>
      </Row>
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
  min-height: 474px;
  border-radius: 8px;
`;

const WideRow = styled(Row)`
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 400px;
`;

const GreyText = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: ${TEXT_GREY};
`;

const StyledCheckbox = styled(CheckBox)`
  margin: 0 6px 0 2px;
`;

const Remember = styled.span`
  display: inline-flex;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: white;
  align-items: center;
`;

const BlueLink = styled(Link)`
  color: ${BLUE_TEXT};
  text-decoration: none;
`;

const GreyLink = styled(Link)`
  color: ${TEXT_GREY};
  margin-right: 16px;
`;
