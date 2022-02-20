import { AppData, HistoryItem } from './types';

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
  Editing = 'Редактирование',
  CurrentBalance = 'Баланс',
  ResetBalance = 'Сбросить баланс',
  ResetTables = 'Сбросить таблицы',
  History = 'История',
  AddToTable = 'Добавление',
  Yes = 'Да',
  No = 'Нет',
  CategoryManagement = 'Категории',
  GoBack = 'Назад',
  CleanHistory = 'Очистить историю',
}

export enum TablesTypesEnum {
  Expenses = 'expenses',
  Income = 'income',
}

export enum FormModesEnum {
  Add = 'add',
  Edit = 'edit',
}

export const emptyData: AppData = {
  expenses: [],
  income: [],
  balance: 0,
  history: {},
};

export const emptyHistoryItem: HistoryItem = {
  [TablesTypesEnum.Expenses]: {
    [FormModesEnum.Add]: [],
    [FormModesEnum.Edit]: [],
  },
  [TablesTypesEnum.Income]: {
    [FormModesEnum.Add]: [],
    [FormModesEnum.Edit]: [],
  },
};
