import { useEffect } from 'react';

const AuthSuccess = () => {
  useEffect(() => {
    window.top.postMessage('AUTH_SUCCESS', '*');
  }, []);

  return null;
};

export default AuthSuccess;
