import {isRequired} from "./argIsRequired";
import {parseObjectResponse} from "./parseApiResponse";

export const editRows = function (api, storageId, sheetName, searchObj, setObj, limit) {
    isRequired([sheetName, "string"], [searchObj, "object"], [searchObj, "object"]);

    const sheetStore = api.custom(storageId);

    limit = !isNaN(limit) && limit ? limit : undefined; // convert limit to get param

    const url = sheetName + "/update",
        specificSheet = sheetStore.all(url);

    // data to post
    const data = {
        "condition": searchObj,
        "set": setObj,
        "limit": limit
    };

    // promise to return
    const promise = new Promise((resolve, reject) => {
        specificSheet.post(data).then((apiResponse) => {
            resolve(parseObjectResponse(apiResponse));
        }).catch((err) => {
            reject(err);
        })
    });

    return promise;
};