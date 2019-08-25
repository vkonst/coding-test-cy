export enum Currency {
  DKK = "DKK",
  EUR = "EUR",
}

export enum NominalValue {
  One = 1,
  Two = 2,
  Five = 5,
  Ten = 10,
  Twenty = 20,
  Fivty = 50,
  Hundreed = 100,
  Twohundred = 200,
  Fivehundred = 500,
  Thousand = 1000,
}

export enum CashForm {
  Banknote = "banknote",
  Coin = "coin",
}

export interface IBanknoteOrCoin {
  form: CashForm;
  ccy: Currency;
  value: NominalValue;
}
