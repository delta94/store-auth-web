import { useEffect } from 'react';
import { windowAlias } from 'helpers';

const AuthSuccess = () => {
  useEffect(() => {
    windowAlias.ipc?.send('AUTH_LOGIN');
  }, []);

  return null;
};

export default AuthSuccess;
