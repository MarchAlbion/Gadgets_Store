import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './store';
import { Provider } from 'react-redux';

import { App } from './App';

import './index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
