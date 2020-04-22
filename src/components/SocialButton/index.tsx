import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from 'styles/primitives';
import { getUrlWithSearch, isLauncher, windowAlias, getUrlParameter } from 'helpers';
import { SOCIAL_URL } from 'api/const';
import { getSocialButtonParams } from 'helpers/social';
import { AppContext } from 'App';
import { useHistory } from 'react-router-dom';
import { OPEN_LINK } from 'const';

interface Props {
  className?: string;
  name: string;
}

const SocialButton = (props: Props) => {
  const { className, name } = props;
  const { loading, setLoading } = useContext(AppContext);
  const { t } = useTranslation();
  const history = useHistory();
  const params = getSocialButtonParams(name);

  if (!params) return null;

  const { Icon, color } = params;

  const handleClick = () => {
    setLoading(true);
    const href = `/${SOCIAL_URL}/${name}/forward`;

    if (isLauncher) {
      setLoading(false);
      const loginChallenge = getUrlParameter('login_challenge');
      history.push(getUrlWithSearch(`/social-sign-in-init/${name}`));
      windowAlias.ipc?.send(OPEN_LINK, `${href}?login_challenge=${loginChallenge}&launcher=true`);
      return;
    }

    window.location.href = getUrlWithSearch(href);
  };

  return (
    <Wrapper
      tabIndex={1}
      className={className}
      color={color}
      onClick={handleClick}
      aria-label="Social button"
      disabled={loading}
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
