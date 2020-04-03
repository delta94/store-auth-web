import { useState, useEffect } from 'react';
import { setCookie, deleteCookie } from 'helpers';
import Centrifuge from 'centrifuge';
import { CHALLENGE_KEY, SOCKET_URL } from 'api/const';
import { getChallenge } from 'api';

type Message = {
  result: {
    data: {
      data: {
        status: string;
        url?: string;
      };
    };
  };
}

export default () => {
  const [status, setStatus] = useState<string>();
  const [redirectUrl, setRedirectUrl] = useState<string>();
  const centrifuge = new Centrifuge(SOCKET_URL);
  const loginChallenge = getChallenge();

  useEffect(() => {
    setCookie(CHALLENGE_KEY, loginChallenge);

    centrifuge.subscribe(`launcher#${loginChallenge}`, ({ result }: Message) => {
      const { status, url } = result?.data?.data || {};
      setStatus(status);
      setRedirectUrl(url);
    });

    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
      deleteCookie(CHALLENGE_KEY);
    };
  }, []);

  return { status, redirectUrl };
};
