import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header, Input, CheckBox, SocialButtons } from 'components';
import { passwordValidate, emailValidate } from 'helpers';
import { Button, Row, TinyText } from 'styles/primitives';
import { BACKGROUND_GREY2, BLUE_TEXT, TEXT_GREY } from 'styles/colors';

interface Props {
  className?: string;
}

const SignUp = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: {
      value: '',
      touched: false,
    },
    name: {
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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form: any = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const remember = form.remember.checked;

    console.log({
      email, password, remember,
    });
  };

  return (
    <Wrapper className={className} onSubmit={handleSubmit}>
      <Header title={t('sign-up')} />
      <StyledSocialButtons />
      <StyledInput
        type="text"
        label={t('display-name')}
        name="name"
        error={errors.name.value}
        validate={emailValidate}
        onValidate={handleErrorsChange}
      />
      <StyledInput
        type="text"
        label={t('email')}
        name="email"
        error={errors.email.value}
        validate={emailValidate}
        onValidate={handleErrorsChange}
      />
      <StyledInput
        type="password"
        label={t('password')}
        name="password"
        error={errors.password.value}
        validate={passwordValidate}
        onValidate={handleErrorsChange}
        tooltip={t('password-tooltip')}
      />
      <Remember>
        <StyledCheckbox checked={false} name="agree" />
        {t('terms-agree')}&ensp;
        <StyledLink to="/terms-of-use">
          {t('terms-of-use')}
        </StyledLink>
      </Remember>
      <StyledButton disabled={!isFormValid} type="submit">
        {t('sign-up')}
      </StyledButton>
      <GreyText>
        {`${t('already-have-account')} `}
        <BlueLink to="sign-in">
          {t('sign-in')}
        </BlueLink>
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

export default React.memo(SignUp);

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 480px;
  padding: 24px 40px;
  background-color: ${BACKGROUND_GREY2};
  border-radius: 8px;
`;

const StyledSocialButtons = styled(SocialButtons)`
  margin: 16px 0;
`;

const StyledButton = styled(Button)`
  margin: 24px 0 16px 0;
  padding: 14px 24px;
  text-transform: uppercase;
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
  width: 100%;
  color: white;
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
