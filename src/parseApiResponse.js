export const parseRows = function (apiResponse) {
    let allRows = [];

    const body = apiResponse.body();
    for (let rowIndex = 0; rowIndex < body.length; rowIndex++) {
        const currentRow = body[rowIndex].data();
        allRows.push(currentRow);
    }

    return allRows;
};

export const parseObjectResponse = function (response) {
    return response.body().data();
};