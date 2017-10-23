import {isRequired} from "./argIsRequired";
import {parseObjectResponse} from "./parseApiResponse";

export const appendRow = function (api, storageId, sheetName, rows) {
    isRequired([rows, "object"]);

    const sheetStore = api.custom(storageId),
        rowsData = JSON.parse(JSON.stringify(rows)),
        url = sheetName + "/append",
        specificSheet = sheetStore.all(url);

    let promise = new Promise((resolve, reject) => {
        specificSheet.post(rowsData).then((apiResponse) => {
            resolve(parseObjectResponse(apiResponse));
        }).catch((err) => {
            reject(err);
        })
    });

    return promise;
};