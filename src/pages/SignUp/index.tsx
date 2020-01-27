import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from 'components';
import { passwordValidate, emailValidate, nameValidate } from 'helpers';

import {
  Form,
  BlueLink,
  GreyText,
  Privacy,
  TermsAgree,
  StyledButton,
  StyledCheckbox,
  StyledInput,
  StyledLink,
  StyledSocialButtons,
  StyledDisplayNameInput,
} from '../shared';

interface Props {
  className?: string;
}

const SignUp = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({
    email: {
      value: '',
      touched: false,
    },
    displayName: {
      value: '',
      touched: false,
    },
    password: {
      value: '',
      touched: false,
    },
  });

  const handleAgreeChange = () => {
    setAgree(!agree);
  };

  const handleErrorsChange = (field: string, value: string) => {
    setErrors({
      ...errors,
      [field]: {
        value,
        touched: true,
      },
    });
  };

  const isFormValid = Object.values(errors).every(({ value, touched }) => !value && touched) && agree;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form: any = event.target;
    const displayName = form.displayName.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log({
      displayName, email, password, agree,
    });
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <Header title={t('sign-up')} />
      <StyledSocialButtons />
      <StyledDisplayNameInput
        label={t('display-name')}
        error={errors.displayName.value}
        validate={nameValidate}
        onValidate={handleErrorsChange}
        isSuccessed={!errors.displayName.value && errors.displayName.touched}
      />
      <StyledInput
        type="text"
        label={t('email')}
        name="email"
        error={errors.email.value}
        validate={emailValidate}
        onValidate={handleErrorsChange}
        isSuccessed={!errors.email.value && errors.email.touched}
      />
      <StyledInput
        type="password"
        label={t('password')}
        name="password"
        error={errors.password.value}
        validate={passwordValidate}
        onValidate={handleErrorsChange}
        isSuccessed={!errors.password.value && errors.password.touched}
        tooltip={t('password-tooltip')}
      />
      <TermsAgree>
        <StyledCheckbox checked={agree} onChange={handleAgreeChange} name="agree" />
        {t('terms-agree')}&ensp;
        <StyledLink to="/terms-of-use">
          {t('terms-of-use')}
        </StyledLink>
      </TermsAgree>
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
    </Form>
  );
};

export default React.memo(SignUp);
