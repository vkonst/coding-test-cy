import ICoin from './coin.interface';

export default class Coin implements ICoin {
    constructor(public readonly denomination) {}
}
