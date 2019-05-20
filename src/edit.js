const isRequired = require("./argIsRequired"),
  fetch = require("isomorphic-unfetch");

module.exports = (url, sheetName, { search, set, limit }) => {
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
