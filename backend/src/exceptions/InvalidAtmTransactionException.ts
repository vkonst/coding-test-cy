import HttpException from './HttpException';

class InvalidAtmTransactionException extends HttpException {
    constructor() {
        super(401, 'Invalid ATM transaction');
    }
}

export default InvalidAtmTransactionException;
