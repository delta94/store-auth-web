import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BLACK, GRAY_TEXT } from 'styles/colors';
import { ExpiredLinkIcon } from 'assets/icons';
import { Column } from 'styles/primitives';

interface Props {
  className?: string;
}

const ExpiredLink = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Wrapper className={className}>
      <Container>
        <StyledExpiredLinkIcon />
        <Title>
          {t('expired-link-title')}
        </Title>
        <Description>
          {t('expired-link-description')}
        </Description>
      </Container>
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(ExpiredLink, areEqual);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: ${BLACK};
`;

const Container = styled(Column)`
  align-items: center;
  max-width: 480px;
`;

const StyledExpiredLinkIcon = styled(ExpiredLinkIcon)`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin:  0 0 12px 0;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: white;
`;

const Description = styled.h4`
  margin:  0;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  color: ${GRAY_TEXT};
`;
