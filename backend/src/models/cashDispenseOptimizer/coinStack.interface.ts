import ICoin from './coin.interface';

export default interface ICoinStack {
    coin: ICoin;
    count: number;
    value?: number;
}
