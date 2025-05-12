export interface FileReader<T> {
  read(): void;
  toArray(): T[];
}
