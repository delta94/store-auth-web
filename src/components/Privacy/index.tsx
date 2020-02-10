import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { StyledLink, GreyText } from 'styles/common';
import { Row } from 'styles/primitives';

interface Props {
  className?: string;
}

const Privacy = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Wrapper className={className}>
      <StyledLink to="/privacy-policy">
        <GreyText>
          {t('privacy-policy')}
        </GreyText>
      </StyledLink>
    </Wrapper>
  );
};

export default React.memo(Privacy);

const Wrapper = styled(Row)`
  margin-top: 16px;
`;
