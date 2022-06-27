const quantityxGen = arg => {
    const resultA = {};
    for (let i = 0; i < arg.length; ++i) {
        if (!resultA[arg[i]]) resultA[arg[i]] = 0;
        ++resultA[arg[i]];
    }
    return resultA;
}

export default quantityxGen;