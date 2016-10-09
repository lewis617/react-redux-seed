import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

function Head(props) {
  const { assets } = props;
  const head = Helmet.rewind();

  return (
    <head>
      {head.base.toComponent()}
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
      {head.script.toComponent()}

      <link rel="shortcut icon" href="/favicon.ico"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      {Object.keys(assets.styles).map((style, key) =>
        <link href={assets.styles[style]} key={key} rel="stylesheet" type="text/css"/>
      )}
    </head>
  );
}

Head.propTypes = {
  assets: PropTypes.object
};

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
