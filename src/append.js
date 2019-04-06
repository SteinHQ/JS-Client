import { isRequired } from "./argIsRequired";
import "whatwg-fetch";

export const appendRow = function(url, storageId, sheetName, rows) {
  isRequired([rows, "object"]);

  url += `${storageId}/${sheetName}/append`;
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
