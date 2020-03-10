import React from 'react';
import styled from 'styled-components';
import { Row } from 'styles/primitives';
import Avatar from './components/Avatar';
import { useTranslation } from 'react-i18next';
import { BLUE_400 } from 'styles/colors';

interface Props {
  className?: string;
  onChangeAccount: () => void;
  user: {
    url: string;
    email: string;
  };
}

const PinnedUser = (props: Props) => {
  const { className, user, onChangeAccount } = props;
  const { url, email } = user;
  const { t } = useTranslation();

  return (
    <Wrapper className={className}>
      <StyledAvatar src={url} />
      <Content>
        <Email>{email}</Email>
        <ChangeButton onClick={onChangeAccount}>
          {t('change-account')}
        </ChangeButton>
      </Content>
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(PinnedUser, areEqual);

const Wrapper = styled(Row)``;

const Content = styled.div`
  flex-grow: 1;
`;

const Email = styled.div`
  font-size: 15px;
  line-height: 22px;
  color: white;
`;

const ChangeButton = styled.div`
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: ${BLUE_400};
  cursor: pointer;
`;

const StyledAvatar = styled((props: any) => <Avatar {...props} />)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;
