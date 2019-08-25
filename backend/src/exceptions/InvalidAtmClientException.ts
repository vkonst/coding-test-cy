import HttpException from "./HttpException";

class InvalidAtmClientException extends HttpException {
  constructor() {
    super(401, "Invalid ATM client");
  }
}

export default InvalidAtmClientException;
