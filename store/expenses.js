import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const newData = {
        ...action.payload,
      };
      state.push(newData);
    },
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse();
      return inverted;
    },
    updateExpense: (state, action) => {
      const id = action.payload.id;
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      state[updatableExpenseIndex] = updatedItem;
    },
    deleteExpense: (state, action) =>
      state.filter((expense) => expense.id !== action.payload),
  },
});

export default expensesSlice.reducer;

export const {
  addExpense,
  setExpenses,
  gatherExpenses,
  deleteExpense,
  updateExpense,
} = expensesSlice.actions;
