const isRequired = require("./argIsRequired"),
  base64Encode = require("universal-base64").encode,
  fetch = require("isomorphic-unfetch");

module.exports = (url, sheetName, rows, { authentication }) => {
  isRequired([rows, "object"]);

  url += `${sheetName}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(rows)
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
