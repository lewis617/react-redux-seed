import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import configureStore from '../utils/configureStore';
import renderFullPage from '../utils/renderFullPage';
import getRoutes from '../routes';
import config from '../config';
import serverRoutes from './routes';

const app = new Express();
const port = config.port;

app.use(Express.static(path.join(__dirname, '..', '..', 'static')));
app.use(favicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
app.use(bodyParser.json());
app.use('/api', serverRoutes);
app.use((req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    webpackIsomorphicTools.refresh();
  }
  const store = configureStore();
  const routes = getRoutes(store);
  match({ routes, location: req.url }, (err, redirect, renderProps) => {
    if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (err) {
      res.sendStatus(500);
      console.error('ROUTER ERROR:', err.stack);
    } else if (renderProps) {
      res.status(200);
      const assets = webpackIsomorphicTools.assets();
      const component = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      res.send(renderFullPage(assets, component, store));
    } else {
      res.sendStatus(400);
    }
  });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Open http://%s:%s in a browser to view the app.', config.host, port);
  }
});
