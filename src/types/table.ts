export type TSortDirection = 'asc' | 'desc';

export interface ISortConfig {
  key: string;
  direction: TSortDirection;
}
