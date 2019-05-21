const isRequired = require("./argIsRequired"),
  base64Encode = require("universal-base64").encode,
  fetch = require("isomorphic-unfetch");

module.exports = (url, sheetName, { search, set, limit, authentication }) => {
  isRequired([sheetName, "string"], [search, "object"], [set, "object"]);

  limit = !isNaN(limit) && limit ? limit : null; // validate limit
  url += `${sheetName}`;

  // data to post
  const data = {
    condition: search,
    set,
    limit
  };
  const options = {
    method: "PUT",
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
        resolve(apiResponse.json());
      })
      .catch(err => {
        reject(err);
      });
  });
};
