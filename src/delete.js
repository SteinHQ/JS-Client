import {isRequired} from "./argIsRequired";
import {parseObjectResponse} from "./parseApiResponse";

export const deleteRows = function (api, storageId, sheetName, searchObj, limit) {
    isRequired([sheetName, "string"], [searchObj, "object"]);

    const sheetStore = api.custom(storageId);

    limit = !isNaN(limit) && limit ? limit : undefined; // validate limit

    const url = sheetName + "/delete",
        specificSheet = sheetStore.custom(url);

    // data to post
    const data = {
        "condition": searchObj,
        "limit": limit
    };

    // promise to return
    const promise = new Promise((resolve, reject) => {
        specificSheet.delete(data).then((apiResponse) => {
            resolve(parseObjectResponse(apiResponse));
        }).catch((err) => {
            reject(err);
        });
    });

    return promise;
};