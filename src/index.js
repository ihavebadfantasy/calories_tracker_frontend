import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.scss';
import App from './App';
import createStore from './store';
import './content/i18n';

(async () => {
  const store = await createStore();

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#root')
  );
})();
