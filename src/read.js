import {isRequired} from "./argIsRequired";
import 'whatwg-fetch';

export const readSheet = function (url, storageId, sheetName, limit, offset) {
    isRequired([sheetName, "string"]);

    let params = "";

    // add limit & offset params as per cases
    if (limit) {
        params += "?limit=" + limit;
        if (offset) {
            params += "&offset=" + offset;
        }
    } else if (offset) {
        params += "?offset=" + offset;
    }

    url += `${storageId}/${sheetName}${params}`;

    let allRows = [];

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