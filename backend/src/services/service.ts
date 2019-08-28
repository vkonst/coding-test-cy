import Singleton from '../lib/singleton';

class Service extends Singleton {
    // TODO: use app-level logging
    public static log = {
        debug: (...args) => {
            console.debug(...args);
        },
        info: (...args) => {
            console.log(...args);
        },
    };
}

export default Service;
