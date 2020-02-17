import { getCookie, getUrlParameter } from 'helpers';

import { RequestType, RequestProps } from './types';
import { XSRF_KEY, BASE_URL, CHALLENGE_KEY } from './const';

const getXSRFToken = () => getCookie(XSRF_KEY) || '';

export const request = async (type: RequestType, props: RequestProps) => {
  const url = `${BASE_URL}/${type}`;
  const challenge = getUrlParameter(CHALLENGE_KEY);

  try {
    const responce = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-xsrf-token': getXSRFToken(),
      },
      credentials: 'include',
      body: JSON.stringify({ challenge, ...props }),
    });

    const json = await responce.json();

    return json;
  } catch (err) {
    console.error(err);
    return ({
      error: 'errors.one.protocol.auth1.unknown',
      code: 'AU-1000',
    });
  }
};