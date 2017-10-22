import {parseRows} from './parseRows';
import {isRequired} from "./argIsRequired";

export const searchSheet = function (api, storageId, sheetName, searchObj, limit, offset) {
    isRequired([sheetName, "string"], [searchObj, "object"]);

    const sheetStore = api.custom(storageId),
        searchString = JSON.stringify(searchObj),
        limitString = limit ? "limit=" + limit : "",
        offsetString = offset ? "offset=" + offset : "";

    let params = "?search=" + searchString;
    // add limit & offset params as per cases
    if (limit) {
        params += "&limit=" + limit;
    }
    if (offset) {
        params += "?offset=" + offset;
    }

    const url = sheetName + "/search" + params,
        specificSheet = sheetStore.all(url);

    let allRows = [];

    // The promise to be returned
    let promise = new Promise((resolve, reject) => {
        // Add all rows to the array
        specificSheet.getAll().then((apiResponse) => {
            allRows = parseRows(apiResponse);
            resolve(allRows);
        }).catch((response) => {
            reject(response);
        });
    });

    return promise;
};