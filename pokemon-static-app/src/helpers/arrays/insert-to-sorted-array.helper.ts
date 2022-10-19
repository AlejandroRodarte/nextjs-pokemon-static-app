export const insertToSortedArray = <Item>(
  items: Item[],
  newItem: Item,
  compareFn: (midItem: Item, newItem: Item) => boolean
): Item[] => {
  let low = 0;
  let high = items.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const isMidItemLower = compareFn(items[mid], newItem);
    if (isMidItemLower) low = mid + 1;
    else high = mid;
  }

  return [...items.slice(0, low), newItem, ...items.slice(low)];
};
