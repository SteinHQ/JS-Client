export const isRequired = function () {
    for (let argCount = 0; argCount < arguments.length; argCount++) {
        const currentArg = arguments[argCount][0],
            currentType = arguments[argCount][1];

        if (typeof currentArg !== currentType) {
            throw new Error("Not all required params were supplied");
        }
    }
};