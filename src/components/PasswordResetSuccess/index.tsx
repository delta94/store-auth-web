import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { EmailSentIcon } from 'assets/icons';
import { 
  Form,
  StyledButton,
  Description,
} from 'styles/common';
import { PLATFORM } from 'const';

type Step = 'enter' | 'captcha' | 'success';

interface Props {
  className?: string;
}

const PasswordReset = (props: Props) => {
  const { className } = props;
  const history = useHistory();
  const { t } = useTranslation();

  const goToSignIn = (event: FormEvent) => {
    event.preventDefault();
    
    history.push('/sign-in');
  };

  return (
    <>
      <StyledEmailSentIcon />
      <Title>{t('email-sent-title')}</Title>
      <Description>{t('email-sent-text-start', { platform: PLATFORM })}
        {' '}
        <WhiteLink to="/sign-in">{t('contact-us')}</WhiteLink>
        {' '}
        {t('email-sent-text-end')}.
      </Description>
      <Form className={className} onSubmit={goToSignIn}>
        <StyledButton type="submit">
          {t('ok')}
        </StyledButton>
      </Form>
    </>
  );
};

export default React.memo(PasswordReset);

const StyledEmailSentIcon = styled(EmailSentIcon)`
  margin-top: 16px;
`;

const Title = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  color: white;
`;

const WhiteLink = styled(Link)`
  color: white;
`;
