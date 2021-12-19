export const data: AppData = {
  expenses: [
    {
      name: 'Продукты',
      value: 0,
    },
    {
      name: 'Одежда',
      value: 0,
    },
    {
      name: 'Здоровье',
      value: 0,
    },
    {
      name: 'Быт',
      value: 0,
    },
    {
      name: 'Транспорт',
      value: 0,
    },
    {
      name: 'Развлечения',
      value: 0,
    },
    {
      name: 'Подарки',
      value: 0,
    },
  ],
  income: [
    {
      name: 'Зарплата',
      value: 0,
    },
    {
      name: 'Стипендия',
      value: 0,
    },
    {
      name: 'Родственники',
      value: 0,
    },
    {
      name: 'Подарки',
      value: 0,
    },
  ],
  balance: 0,
};

export enum TablesTitlesEnum {
  Expenses = 'Расходы',
  Income = 'Доходы',
}
