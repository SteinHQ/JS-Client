import { isRequired } from "./argIsRequired";
import "whatwg-fetch";

export const deleteRows = function(url, sheetName, { search, limit }) {
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
