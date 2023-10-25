import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { InfoState } from "../../utils/slice.types";
import { FilterCriteria, Person } from "../../utils/interfaces";

const initialState: InfoState = {
  isLoading: false,
  error: null,
  people: [],
  categories: [],
  scroll: false,
};

export const getAllData = createAsyncThunk<
  Person[],
  {
    criteria: FilterCriteria;
  }
>("getAll", async ({ criteria }) => {
  criteria = criteria || {};

  const response = await axios.get(
    `https://greet.bg/wp-json/wc/store/products?per_page=12`,
    {
      params: criteria,
    }
  );
  return response?.data;
});

const peopleSlice = createSlice({
  extraReducers(builder) {
    return builder
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.categories = [];
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        const flattenedCategories = action.payload.flatMap(
          (el) => el.categories
        );
        const uniqueCategories = Array.from(
          new Set(flattenedCategories.map((cat) => cat.id))
        ).map((id) => {
          const category = flattenedCategories.find((cat) => cat.id === id);
          return { id: category!.id, name: category!.name };
        });
        if (
          action.meta.arg.criteria.append === false ||
          action.meta.arg.criteria.category !== undefined ||
          action.meta.arg.criteria.order !== undefined ||
          action.meta.arg.criteria.orderby !== undefined
        ) {
          state.people = action.payload;
        } else {
          state.people = [...state.people, ...action.payload];
        }

        state.categories = uniqueCategories as [];
        state.isLoading = false;
      });
  },
  initialState,
  name: "people",
  reducers: {
    stateReset: (state) => {
      state.people = [];
    },
  },
});
const peopleReducer = peopleSlice.reducer;
export const { stateReset } = peopleSlice.actions;
export default peopleReducer;
