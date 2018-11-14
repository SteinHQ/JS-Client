import {isRequired} from './argIsRequired';
import 'whatwg-fetch';

export const readSheet = (url, sheetName, {limit, offset, search}) => {
  isRequired([sheetName, 'string']);

  let URLGetParameters = [
    limit ? `limit=${limit}` : '',
    offset ? `offset=${offset}` : '',
    search ? `search=${JSON.stringify(search)}` : ''
  ];

  url += `${sheetName}?${URLGetParameters.join('&')}`;

  return new Promise((resolve, reject) => {
    // Add all rows to the array
    fetch(url)
        .then((apiResponse) => {
          resolve(apiResponse.json());
        })
        .catch((response) => {
          reject(response);
        });
  });
};