const isUndefined = obj => obj !== undefined;

export const filterByType = (obj, query) => {
  return obj.filter(function(item) {
    return (isUndefined(item.type) && item.type === query) || false;
  });
};
