export function noCategories(data: string[]): boolean {
  return !data.length;
}

export function areAllCategoriesEmpty(data: number[]): boolean {
  return data.every((value) => value === 0);
}
