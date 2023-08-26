export function unique<T>(value: T, index: number, array: ReadonlyArray<T>) {
  return array.indexOf(value) === index;
}
