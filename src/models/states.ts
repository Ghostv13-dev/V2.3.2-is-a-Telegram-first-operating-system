// src/models/states.ts
export type FSMState = string;

export interface Mutation {
  key: string;
  value: unknown;
}
