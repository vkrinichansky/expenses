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
  AddCategoryPlaceholder = 'Название категории',
  Add = 'Добавить',
  Edit = 'Редактировать',
  Adding = 'Добавление',
  Editing = 'Редактирование',
  Close = 'Закрыть',
  CurrentBalance = 'Текущий баланс',
  ResetBalance = 'Сбросить баланс',
  ResetTables = 'Сбросить таблицы',
  History = 'История',
}

export enum TableTypesEnum {
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
  [TableTypesEnum.Expenses]: {
    [FormModesEnum.Add]: [],
    [FormModesEnum.Edit]: [],
  },
  [TableTypesEnum.Income]: {
    [FormModesEnum.Add]: [],
    [FormModesEnum.Edit]: [],
  },
};
