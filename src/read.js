const isRequired = require("./lib/argIsRequired"),
  processFetchResponse = require("./lib/processFetchResponse"),
  base64Encode = require("universal-base64").encode,
  fetch = require("isomorphic-unfetch");

module.exports = (
  url,
  sheetName,
  { limit, offset, search, authentication } = {}
) => {
  isRequired([sheetName, "string"]);

  let URLGetParameters = [
    limit ? `limit=${limit}` : "",
    offset ? `offset=${offset}` : "",
    search ? `search=${JSON.stringify(search)}` : ""
  ];

  url += `${sheetName}?${URLGetParameters.filter(param => !!param).join("&")}`;

  const options = {};

  if (authentication) {
    const authCredentials = base64Encode(
      `${authentication.username}:${authentication.password}`
    );
    options.headers = { authorization: `Basic ${authCredentials}` };
  }

  return new Promise((resolve, reject) => {
    // Add all rows to the array
    fetch(url, options)
      .then(apiResponse => {
        return processFetchResponse(apiResponse);
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        reject(response);
      });
  });
};
