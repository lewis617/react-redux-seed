import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import { Main, Home, Counter, NotFound } from './containers';
import { loadCounterIfNeeded } from './redux/counter';

const preload = promise => (nextState, replace, cb) => {
  promise()
    .then(() => cb())
    .catch(err => console.error(err.stack));
};

export default (store) => {
  const counterPromise = () => store.dispatch(loadCounterIfNeeded());
  return (
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="counter" component={Counter} onEnter={preload(counterPromise)}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
