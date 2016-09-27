import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Head from './Head';

function renderFullPage(assets, component, store) {
  const head = renderToString(<Head assets={assets}/>);
  const content = renderToString(component);
  return `
    <!doctype html> 
    <html>
      ${head}
      <body>
        <!--[if lt IE 9]>
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
