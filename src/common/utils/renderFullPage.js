import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

function renderFullPage(assets, component, store) {
  let content = '';
  try {
    content = renderToString(component);
  } catch (err) {
    console.error('RENDER ERROR: ', err.stack);
  }
  const head = Helmet.rewind();
  const assetsLink = Object.keys(assets.styles).map(style =>
    `<link href=${assets.styles[style]} rel="stylesheet" type="text/css"/>`
  );
  return `
    <!doctype html> 
    <html>
      <head>
      ${head.base.toString()}
      ${head.title.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
      ${assetsLink}
      </head>
      <body>
        <!--[if lt IE 9]>
          <p class="alert alert-danger">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div id="app">${content}</div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(store.getState())}
        </script>
        <script src=${assets.javascript.main}></script>
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
      </body>
    </html>
    `;
}

export default renderFullPage;
