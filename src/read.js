const isRequired = require("./argIsRequired"),
  fetch = require("isomorphic-unfetch");

module.exports = (url, sheetName, { limit, offset, search } = {}) => {
  isRequired([sheetName, "string"]);

  let URLGetParameters = [
    limit ? `limit=${limit}` : "",
    offset ? `offset=${offset}` : "",
    search ? `search=${JSON.stringify(search)}` : ""
  ];

  url += `${sheetName}?${URLGetParameters.filter(param => !!param).join("&")}`;

  return new Promise((resolve, reject) => {
    // Add all rows to the array
    fetch(url)
      .then(apiResponse => {
        resolve(apiResponse.json());
      })
      .catch(response => {
        reject(response);
      });
  });
};
