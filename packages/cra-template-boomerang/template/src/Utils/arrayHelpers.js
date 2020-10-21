import orderBy from "lodash/orderBy";

export const sortByProp = (arr, prop, direction = "asc") =>
  orderBy(arr, typeof prop === "string" ? [prop] : [...prop], [direction]);

export const arrayPagination = (array, page, pageSize, key, direction) => {
  const newArray = sortByProp([...array], key, direction.toLowerCase());
  const startIndex = (page - 1) * pageSize;
  let finishIndex = page * pageSize;
  finishIndex = finishIndex > newArray.length ? newArray.length : finishIndex;
  return newArray.slice(startIndex, finishIndex);
};

