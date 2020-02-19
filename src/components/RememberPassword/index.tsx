import React from 'react';
import { useTranslation } from 'react-i18next';
import { GreyText, BlueLink } from 'styles/common';
import { getUrlWithSearch } from 'helpers';

interface Props {
  className?: string;
}

const RememberPassword = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <GreyText className={className}>
      {`${t('remember-password')}? `}
      <BlueLink to={getUrlWithSearch('/sign-in')}>
        {t('sign-in')}
      </BlueLink>
    </GreyText>
  );
};

export default React.memo(RememberPassword);
