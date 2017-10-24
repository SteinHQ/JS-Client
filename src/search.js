import {isRequired} from "./argIsRequired";
import 'whatwg-fetch';

export const searchSheet = function (url, storageId, sheetName, searchObj, limit, offset) {
    isRequired([sheetName, "string"], [searchObj, "object"]);

    // convert all values to string
    const searchKeys = Object.keys(searchObj);
    for (let i = 0; i < searchKeys.length; i++) {
        const currentKey = searchKeys[i];
        searchObj[currentKey] = searchObj[currentKey].toString();
    }

    const searchString = JSON.stringify(searchObj),
        limitString = limit ? "limit=" + limit : "",
        offsetString = offset ? "offset=" + offset : "";

    let params = "?search=" + searchString;
    // add limit & offset params as per cases
    if (limit) {
        params += "&limit=" + limit;
    }
    if (offset) {
        params += "&offset=" + offset;
    }

    url += `${storageId}/${sheetName}/search${params}`;

    // The promise to be returned
    let promise = new Promise((resolve, reject) => {
        // Add all rows to the array
        fetch(url).then((apiResponse) => {
            resolve(apiResponse.json());
        }).catch((response) => {
            reject(response);
        });
    });

    return promise;
};