import {isRequired} from "./argIsRequired";
import 'whatwg-fetch';

export const editRows = function (url, storageId, sheetName, searchObj, setObj, limit) {
    isRequired([sheetName, "string"], [searchObj, "object"], [setObj, "object"]);

    limit = !isNaN(limit) && limit ? limit : undefined; // validate limit

    url += `${storageId}/${sheetName}/update`;

    // data to post
    const data = {
        "condition": searchObj,
        "set": setObj,
        "limit": limit
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
;
    // promise to return
    const promise = new Promise((resolve, reject) => {
        fetch(url, options).then((apiResponse) => {
            resolve(apiResponse.json());
        }).catch((err) => {
            reject(err);
        })
    });

    return promise;
};