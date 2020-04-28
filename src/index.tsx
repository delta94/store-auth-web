import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

(window as any).ipc = (window as any).ipc || {
  send: (eventName: string, params: any) => {
    window.top.postMessage({
      type: 'ipc',
      eventName,
      params: params || undefined,
    }, '*');
  },
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
