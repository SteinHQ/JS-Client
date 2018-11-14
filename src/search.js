import {isRequired} from './argIsRequired';
import 'whatwg-fetch';

export const searchSheet = function (url, sheetName, searchObj, limit, offset) {
  isRequired([sheetName, 'string'], [searchObj, 'object']);

  // Convert all values to string
  const searchKeys = Object.keys(searchObj);
  for (let i = 0; i < searchKeys.length; i++) {
    const currentKey = searchKeys[i];
    searchObj[currentKey] = searchObj[currentKey].toString();
  }

  const searchString = JSON.stringify(searchObj);
  let params = `?search=${searchString}`;
  // Add limit & offset params as per cases
  if (limit) {
    params += `&limit=${limit}`;
  }
  if (offset) {
    params += `&offset=${offset}`;
  }

  url += `${sheetName}${params}`;

  return new Promise((resolve, reject) => {
    // Add all rows to the array
    fetch(url).then((apiResponse) => {
      resolve(apiResponse.json());
    }).catch((response) => {
      reject(response);
    });
  });
};