module.exports = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return handleResponseNotOk(response);
  }
};

function handleResponseNotOk(response) {
  return response.json()
    .then(data => {
      if (!data.error) {
        // error not from Stein server, probably from web server, proxy server, etc.
        return createHttpError(response);
      } else {
        return new Error(data.error);
      }
    })
    .catch(() => {
      // not a JSON document
      return createHttpError(response);
    })
    .then((error) => {
      throw error;
    });
}

function createHttpError(response) {
  const error = new Error(`HTTP ${response.status} ${response.statusText}`);
  error.response = response; // include response object so users can access the error page
  return error;
}
