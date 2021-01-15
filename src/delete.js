const isRequired = require("./lib/argIsRequired"),
  processFetchResponse = require("./lib/processFetchResponse"),
  base64Encode = require("universal-base64").encode,
  fetch = require("isomorphic-unfetch");

module.exports = (url, sheetName, { search, limit, authentication }) => {
  isRequired([sheetName, "string"], [search, "object"]);

  limit = !isNaN(limit) && limit ? limit : null; // validate limit
  url += `${sheetName}`;

  // data to post
  const data = {
    condition: search,
    limit
  };
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  if (authentication) {
    const authCredentials = base64Encode(
      `${authentication.username}:${authentication.password}`
    );
    options.headers.authorization = `Basic ${authCredentials}`;
  }

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(apiResponse => {
        return processFetchResponse(apiResponse);
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
