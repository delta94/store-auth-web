import React from 'react';
import 'i18n';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="App">
      <h1>{t('title')}</h1>
      <p>API_URL: {process.env.REACT_APP_API_URL}</p>
    </div>
  );
};

export default App;
