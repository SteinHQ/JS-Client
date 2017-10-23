import {parseRows} from './parseApiResponse';
import {isRequired} from "./argIsRequired";

export const readSheet = function (api, storageId, sheetName, limit, offset) {
    isRequired([sheetName, "string"])

    const sheetStore = api.custom(storageId);

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

    const url = sheetName + params,
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