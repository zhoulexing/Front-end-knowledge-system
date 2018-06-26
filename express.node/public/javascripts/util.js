function parseParam(params) {
  params = _.omitBy(params, _.isNil);
  return Object.keys(params).map(key => `${ encodeURIComponent(params[key]) }`).join('&');
}

function Get(url, params = {}) {
  const query = parseParam(params);
  if(query) {
    url = `${ url }?${ query }`;
  }
  return xFetch(url, { method: 'GET' });
}

function Post(url, params = {}) {
  const query = parseParam(params);
  return xFetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: query
  });
}

function Upload(url, formData) {
  return fetch(url, {
    method: 'POST',
    body: formData
  });
}

function xFetch(url, options) {
  const opts = {...options, credentials: 'include'};
  return fetch(url, opts)
  .then(res => res.json());
}

