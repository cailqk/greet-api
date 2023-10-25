import type { RootState } from "../../app/store";

const infoStateSelector = (state: RootState) => state.people;

export const selectPeople = (state: RootState) =>
  infoStateSelector(state).people;

export const selectCategories = (state: RootState) =>
  infoStateSelector(state).categories;

export const selectIsLoading = (state: RootState) =>
  infoStateSelector(state).isLoading;

export const selectIsScroll = (state: RootState) =>
  infoStateSelector(state).scroll;
