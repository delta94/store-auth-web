import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BlueLink, StyledLink, GreyText } from 'styles/common';
import { Row, TinyText } from 'styles/primitives';
import { isLauncher } from 'helpers';

interface Props {
  className?: string;
}

const Privacy = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  const webLink = (
    <StyledLink to="/privacy-policy">
      <GreyText>
        {t('privacy-policy')}
      </GreyText>
    </StyledLink>
  );

  const launcherLink = (
    <TinyText>
      <BlueLink to="/privacy-policy">
        {t('privacy-policy')}
      </BlueLink>
    </TinyText>
  );

  return (
    <Wrapper className={className}>
      {isLauncher ? launcherLink : webLink}
    </Wrapper>
  );
};

export default React.memo(Privacy);

const Wrapper = styled(Row)`
  margin-top: 16px;
`;
