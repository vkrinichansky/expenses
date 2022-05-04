import { DailyHistoryItem } from './types';

export enum TablesTitlesEnum {
  Expenses = 'Расходы',
  Income = 'Доходы',
}

export enum WordsEnum {
  Category = 'Категория',
  Spent = 'Потрачено',
  Received = 'Получено',
  Currency = 'грн.',
  Total = 'Всего',
  Controls = 'Управление',
  AddCategory = 'Добавить',
  RemoveCategory = 'Удалить',
  AddCategoryPlaceholder = 'Название...',
  Add = 'Добавить',
  Remove = 'Удалить',
  Adding = 'Добавление',
  CurrentBalance = 'Баланс',
  ResetBalance = 'Баланс',
  ResetTables = 'Таблицы',
  History = 'По дням',
  AddToTable = 'Добавление',
  Yes = 'Да',
  No = 'Нет',
  CategoryManagement = 'Категории',
  GoBack = 'Назад',
  CleanHistory = 'История',
  CleanMonthlyHistory = 'По месяцам',
  NoHistoryYet = 'История пуста',
  MonthlyReset = 'Ежемесячный сброс',
  MonthlyHistory = 'По месяцам',
  NoChartData = 'Нет данных для отображения',
  Reset = 'Сброс',
}

export enum TablesTypesEnum {
  Expenses = 'expenses',
  Income = 'income',
}

export enum HistoryTypesEnum {
  Daily = 'daily',
  Monthly = 'Monthly',
}

export const emptyHistoryItem: DailyHistoryItem = {
  [TablesTypesEnum.Expenses]: [],
  [TablesTypesEnum.Income]: [],
};
