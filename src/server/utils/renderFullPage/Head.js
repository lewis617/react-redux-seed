import React, { PropTypes } from 'react';
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

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {Object.keys(assets.styles).map((style, key) =>
          <link href={assets.styles[style]} key={key} rel="stylesheet" type="text/css"/>
        )}
      </head>
    );
}

Head.propTypes = {
  assets: PropTypes.object
};

export default Head;
