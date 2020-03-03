import { FACEBOOK, TWITTER } from 'const';
import { FACEBOOK_COLOR, TWITTER_COLOR } from 'styles/colors';
import { FacebookIcon, TwitterIcon } from 'assets/icons';

export const getSocialButtonParams = (name: string) => {
  switch (name) {
    case FACEBOOK:
      return {
        color: FACEBOOK_COLOR,
        Icon: FacebookIcon,
      };

    case TWITTER:
      return {
        color: TWITTER_COLOR,
        Icon: TwitterIcon,
      };

    default:
      return null;
  }
};
