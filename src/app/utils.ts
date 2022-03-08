import { DailyHistoryCategoryItem, TableItem } from './types';

export function noCategories(data: string[]): boolean {
  return !data.length;
}

export function areAllCategoriesEmpty(data: number[]): boolean {
  return data.every((value) => value === 0);
}

export function getCurrentDate(): string {
  return new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function createNewTableItem(category: string): TableItem {
  return {
    name: category,
    value: 0,
  };
}

export function addValueToDefiniteCategory(
  item: TableItem,
  category: string,
  value: number
): TableItem {
  if (item.name === category) {
    item.value += value;
    return { ...item };
  }
  return item;
}

export function addValueToDefiniteCategoryInDailyHistory(
  item: DailyHistoryCategoryItem,
  category: string,
  value: number
): DailyHistoryCategoryItem {
  if (item.categoryName === category) {
    item.value += value;
    return { ...item };
  }
  return item;
}
