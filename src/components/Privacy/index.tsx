import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BlueLink } from 'styles/common';
import { Row, TinyText } from 'styles/primitives';

interface Props {
  className?: string;
}

const Privacy = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Wrapper className={className}>
      <TinyText>
        <BlueLink to="/privacy-policy">
          {t('privacy-policy')}
        </BlueLink>
      </TinyText>
    </Wrapper>
  );
};

export default React.memo(Privacy);

const Wrapper = styled(Row)`
  margin-top: 16px;
`;
