import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'Features/App';
import { APP_ROOT } from 'Config/appConfig';

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

function Root(props) {
  const { store } = props;
  return (
    <Provider store={store}>
      <BrowserRouter basename={APP_ROOT}>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
