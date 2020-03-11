import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormWrapper, Description } from 'styles/common';
import { FormHeader, NewPasswordForm, Loader } from 'components';
import { PLATFORM, TOKEN } from 'const';
import { getUrlParameter, getUrlWithSearch } from 'helpers';
import { checkResetTokenRequest } from 'api';
import { useHistory } from 'react-router-dom';
import { AppContext } from 'App';

interface Props {
  className?: string;
}

const token = getUrlParameter(TOKEN) || '';

const NewPassword = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const { loading, setLoading } = useContext(AppContext);
  const [email, setEmail] = useState('');

  const checkResetToken = async () => {
    const { email, error } = await checkResetTokenRequest({ token });

    setLoading(false);

    if (error) {
      history.replace(getUrlWithSearch('/expired-link'));
      return;
    } 

    setEmail(email);
  };

  useEffect(() => {
    checkResetToken();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader size={14} color="white" />;

  return (
    <FormWrapper className={className}>
      <FormHeader title={t('new-password')} />
      <StyledDescription>
        {t('new-password-description', { platform: PLATFORM, email })}
      </StyledDescription>
      <NewPasswordForm token={token} />
    </FormWrapper>
  );
};

export default React.memo(NewPassword);

const StyledDescription = styled(Description)`
  margin-bottom: 16px;
`;
