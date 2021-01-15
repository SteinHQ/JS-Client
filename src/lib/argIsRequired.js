module.exports = (...argsToCheck) => {
  for (let argCount = 0; argCount < argsToCheck.length; argCount++) {
    const currentArg = argsToCheck[argCount][0],
      currentType = argsToCheck[argCount][1];

    if (typeof currentArg !== currentType) {
      throw new Error("Not all required params were supplied");
    }
  }
};
