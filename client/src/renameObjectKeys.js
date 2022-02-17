// Credit for renameObjectKeys function to https://www.30secondsofcode.org/js/s/rename-keys and https://www.banjocode.com/post/javascript/rename-keys/
function renameObjectKeys(keysMap, obj) {
  return Object.keys(obj).reduce(
    (accumulator, key) => ({
      ...accumulator,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );
}

export default renameObjectKeys;
