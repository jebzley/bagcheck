// why is this not on the Math object?
export function percent(total: number, value: number) {
  if (total === 0) {
    return 0;
  }

  return (value / total) * 100;
}
