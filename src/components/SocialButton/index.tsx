import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from 'styles/primitives';
import { getUrlWithSearch } from 'helpers';
import { SOCIAL_URL, BASE_URL } from 'api/const';
import { getSocialButtonParams } from 'helpers/social';

interface Props {
  className?: string;
  name: string;
}

const SocialButton = (props: Props) => {
  const { className, name } = props;
  const { t } = useTranslation();
  const params = getSocialButtonParams(name);

  if (!params) return null;

  const { Icon, color } = params;

  const handleClick = async () => {
    const href = `${BASE_URL}${SOCIAL_URL}/${name}/forward`;

    window.location.href = getUrlWithSearch(href);
  };

  return (
    <Wrapper
      tabIndex={1}
      className={className}
      color={color}
      onClick={handleClick}  
    >
      <Icon />
      {t(name)}
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(SocialButton, areEqual);

const Wrapper = styled(Button).attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 108px;
  margin-left: 8px;
  padding: 8px 6px;

  &:first-child {
    margin-left: 0;
  }

  svg {
    width: 24px;
    margin-right: 2px;
  }
`;
