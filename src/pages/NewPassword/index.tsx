import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormWrapper, Description } from 'styles/common';
import { FormHeader, NewPasswordForm, Loader } from 'components';
import { PLATFORM } from 'const';
import { getUrlParameter } from 'helpers';
import { checkResetTokenRequest } from 'api';
import { useHistory } from 'react-router-dom';

interface Props {
  className?: string;
}

const TOKEN = 'token';
const token = getUrlParameter(TOKEN) || '';

const mockEmail = 'john@example.com';

const NewPassword = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const checkResetToken = async () => {
    setLoading(true);

    const { email, error } = await checkResetTokenRequest(token);

    if (error) {
      // with check token API
      // history.replace('/expired-link');
      // return;

      // without check token API
      setEmail(mockEmail);
    } else {
      setEmail(email);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkResetToken();
  }, []);

  return (
    <FormWrapper className={className}>
      <FormHeader title={t('new-password')} />
      {loading
        ? <StyledLoader title="Loading..." />
        : (
          <>
            <StyledDescription>
              {t('new-password-description', { platform: PLATFORM, email })}
            </StyledDescription>
            <NewPasswordForm token={token} />
          </>  
        )}
    </FormWrapper>
  );
};

export default React.memo(NewPassword);

const StyledDescription = styled(Description)`
  margin-bottom: 16px;
`;

const StyledLoader = styled((props: any) => <Loader {...props} />).attrs({ size: 14, color: 'white' })`
  flex-grow: 1;
  justify-self: center;
`;
