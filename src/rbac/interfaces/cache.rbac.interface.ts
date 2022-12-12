export interface ICacheRBAC {
  KEY: string;
  TTL: number;

  get(): any | null;
  set(value: any): void;

  del(): void;
}
