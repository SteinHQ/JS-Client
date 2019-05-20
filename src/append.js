const isRequired = require("./argIsRequired"),
  fetch = require("isomorphic-unfetch");

module.exports = (url, sheetName, rows) => {
  isRequired([rows, "object"]);

  url += `${sheetName}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(rows)
  };

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
