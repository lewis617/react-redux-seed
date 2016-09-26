import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import configureStore from '../common/utils/configureStore';
import getRoutes from '../common/routes';
import Html from './utils/Html';
import config from '../config';
import serverRoutes from './routes';

const app = new Express();
const port = config.port;
const store = configureStore();
const routes = getRoutes(store);

app.use(Express.static(path.join(__dirname, '..', '..', 'static')));
app.use(favicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
app.use(bodyParser.json());
app.use('/api', serverRoutes);
app.use((req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    webpackIsomorphicTools.refresh();
  }
  match({ routes, location: req.url }, (err, redirect, renderProps) => {
    if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (err) {
      res.status(500);
      hydrateOnClient();
      console.error('ROUTER ERROR:', err.stack);
    } else if (renderProps) {
      res.status(200);
      const component = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      res.send('<!doctype html>\n' +
        renderToString(
          <Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>)
      );
    } else {
      res.status(404).send('Not found');
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
