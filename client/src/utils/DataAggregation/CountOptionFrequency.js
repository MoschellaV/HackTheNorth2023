// export function countMaxIndices(data, encoding) {
//     const countDict = {};

//     for (let i = 0; i < data.length; i++) {
//         const array = data[i];
//         const maxIndex = array.indexOf(Math.max(...array));

//         if (maxIndex in countDict) {
//             countDict[maxIndex]++;
//         } else {
//             countDict[maxIndex] = 1;
//         }
//     }

//     return countDict;
// }

export function countMaxIndices(data, encoding) {
    const resultMap = {}; // Initialize an object to store counts with encoded keys

    for (let i = 0; i < data.length; i++) {
        const array = data[i];
        const maxIndex = array.indexOf(Math.max(...array));

        const encodedKey = encoding[maxIndex];

        if (encodedKey in resultMap) {
            resultMap[encodedKey]++;
        } else {
            resultMap[encodedKey] = 1;
        }
    }

    return resultMap;
}
