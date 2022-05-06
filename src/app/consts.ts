import { DailyHistoryItem } from './types';

export enum TablesTitlesEnum {
  Expenses = 'Расходы',
  Income = 'Доходы',
}

export enum DictionaryEnum {
  Spent = 'Потрачено',
  Received = 'Получено',
  Category = 'Категория',
  Currency = 'грн.',
  Total = 'Всего',
  //***
  Add = 'Добавить',
  Remove = 'Удалить',
  //***
  Balance = 'Баланс',
  Tables = 'Таблицы',
  DailyHistory = 'По дням',
  MonthlyHistory = 'По месяцам',
  //***
  Yes = 'Да',
  No = 'Нет',
  //***
  NoHistoryYet = 'История пуста',
  NoChartData = 'Нет данных для отображения',
  //***
  AddCategoryPlaceholder = 'Название...',
  Adding = 'Добавление',
  CategoryManagement = 'Категории',
  GoBack = 'Назад',
  Reset = 'Сброс',
  Clean = 'Очистить',
  CleanHistory = 'Очистить историю',
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
