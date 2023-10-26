import { SerializedError } from "@reduxjs/toolkit";
import { Category, Person } from "./interfaces";

export type InitialState = {
  error: SerializedError | null;
  isLoading: boolean;
};

export type InfoState = InitialState & {
  people: Person[];
  categories: Category[];
};
