import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Head from './Head';

function renderFullPage(assets, component, store) {
  const head = renderToString(<Head assets={assets}/>);
  const content = renderToString(component);
  return `
    <!doctype html>
    <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
    <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
    <!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
    <!--[if gt IE 8]><!--> 
    <html class="no-js" lang=""> <!--<![endif]-->
      ${head}
      <body>
        <!--[if lt IE 8]>
          <p class="alert alert-danger">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div id="app">${content}</div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(store.getState())}
        </script>
        <script src=${assets.javascript.main}></script>
      </body>
    </html>
    `;
}

export default renderFullPage;
