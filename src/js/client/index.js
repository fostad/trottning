import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter, RouteHandler } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import { getPackets } from './services';
import { savePackets } from './actions';

import Layout from "./components/Layout";

const root = document.getElementById('root');
const store = createStore(reducer);

const initializeStates = () => {
  getPackets()
    .then(packets => {
      store.dispatch(savePackets(packets));
    });
};

initializeStates();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Layout exact path='/' component={Layout}>
        </Layout>
      </Switch>
    </BrowserRouter>
  </Provider>, root);
