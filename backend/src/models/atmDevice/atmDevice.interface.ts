import { CashForm, Currency, IBanknoteOrCoin, NominalValue } from "../../@types/types";
import { AtmDeviceId, AtmDeviceStatus } from "./types";

export interface IAtmDevice {
  readonly id: AtmDeviceId;
  readonly token: string;
  status: AtmDeviceStatus;
  cash: ICashBoxItem[];
}

export interface ICashBoxItem {
  readonly item: IBanknoteOrCoin;
  itemsNum: number;
}

export const mockAtmDevice: IAtmDevice = {
  id: "d123",
  token: "1f797e784a78f3ef5aea1465a039795540b4f70a9fce1f35fb3995c518f3c5bf",
  status: undefined,
  cash: [
    {
      item: {
        form: CashForm.Banknote,
        ccy: Currency.DKK,
        value: NominalValue.Thousand,
      },
      itemsNum: 5,
    },
    {
      item: {
        form: CashForm.Banknote,
        ccy: Currency.DKK,
        value: NominalValue.Fivehundred,
      },
      itemsNum: 10,
    },
    {
      item: {
        form: CashForm.Banknote,
        ccy: Currency.DKK,
        value: NominalValue.Twohundred,
      },
      itemsNum: 20,
    },
    {
      item: {
        form: CashForm.Banknote,
        ccy: Currency.DKK,
        value: NominalValue.Hundreed,
      },
      itemsNum: 30,
    },
    {
      item: {
        form: CashForm.Banknote,
        ccy: Currency.DKK,
        value: NominalValue.Fivty,
      },
      itemsNum: 50,
    },
    {
      item: {
        form: CashForm.Coin,
        ccy: Currency.DKK,
        value: NominalValue.Twenty,
      },
      itemsNum: 50,
    },
    {
      item: {
        form: CashForm.Coin,
        ccy: Currency.DKK,
        value: NominalValue.Ten,
      },
      itemsNum: 25,
    },
    {
      item: {
        form: CashForm.Coin,
        ccy: Currency.DKK,
        value: NominalValue.Five,
      },
      itemsNum: 25,
    },
    {
      item: {
        form: CashForm.Coin,
        ccy: Currency.DKK,
        value: NominalValue.Two,
      },
      itemsNum: 25,
    },
    {
      item: {
        form: CashForm.Coin,
        ccy: Currency.DKK,
        value: NominalValue.One,
      },
      itemsNum: 30,
    },
  ],
};
