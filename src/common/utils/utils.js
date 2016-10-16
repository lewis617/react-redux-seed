import 'isomorphic-fetch';
import config from '../../config';

function handleErrors(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export function customFetch(url, option) {
  const prefix = __SERVER__ ? `http://${config.host}:${config.port}/api` : '/api';

  let opt = option || {};
  if (__SERVER__) {
    opt = {
      ...opt,
      headers: {
        ...opt.headers,
        cookie: __COOKIE__
      }
    };
  } else {
    opt = {
      ...opt,
      credentials: 'same-origin'
    };
  }

  return fetch(prefix + url, opt)
    .then(handleErrors);
}
