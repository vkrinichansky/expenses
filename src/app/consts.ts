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
  AddCategory = 'Добавить категорию',
  RemoveCategory = 'Удалить категорию',
  AddCategoryPlaceholder = 'Название категории',
  Add = 'Добавить',
  Remove = 'Удалить',
  Adding = 'Добавление',
  Editing = 'Редактирование',
  CurrentBalance = 'Текущий баланс',
  ResetBalance = 'Сбросить баланс',
  ResetTables = 'Сбросить таблицы',
  History = 'История',
  AddToTable = 'Добавить в таблицу',
  Yes = 'Да',
  No = 'Нет',
  CategoryManagement = 'Управление категориями',
  GoBack = 'Назад',
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
