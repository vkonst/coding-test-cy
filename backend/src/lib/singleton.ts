export default class Singleton {
    public static get Instance(): Singleton {
        return this.instance === null ? new this() : this.instance;
    }

    private static instance: Singleton = null;

    protected constructor() {
        if (Singleton.instance !== null) {
            throw new Error('Use SingletonClass.getInstance() instead of new');
        }
        Singleton.instance = this;
    }
}
