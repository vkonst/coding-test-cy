import HttpException from './HttpException';

class InvalidAtmSessionException extends HttpException {
    constructor() {
        super(401, 'Invalid ATM user');
    }
}

export default InvalidAtmSessionException;
