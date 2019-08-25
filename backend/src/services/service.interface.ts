export default interface IService<T> {
  find(id: string): Promise<T|undefined>;
  create(item: T): Promise<T>;
  delete(id: string): Promise<T>;
  authenticate(item: T): Promise<boolean>;
}
