import { useState, useEffect } from 'react';
import { setCookie, deleteCookie } from 'helpers';
import Centrifuge from 'centrifuge';
import { CHALLENGE_KEY, SOCKET_URL } from 'api/const';
import { getChallenge } from 'api';

type NotificationPayload = {
  status: string;
  url?: string;
}

export default () => {
  const [status, setStatus] = useState<string>();
  const [redirectUrl, setRedirectUrl] = useState<string>();
  const centrifuge = new Centrifuge(SOCKET_URL);

  useEffect(() => {
    setCookie(CHALLENGE_KEY, getChallenge());

    centrifuge.subscribe('notification', (payload: NotificationPayload) => {
      const { status, url } = payload;
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
