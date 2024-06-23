export function humanListJoin(items: string[], conjunctive = "or") {
  if (items.length <= 1) return items;

  const newItems = [...items];
  newItems.pop();
  newItems.push(`${conjunctive} ${items[items.length - 1]}`);
  return newItems.length > 2 ? newItems.join(", ") : newItems.join(" ");
}
