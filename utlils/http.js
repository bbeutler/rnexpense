import axios from "axios";

const BACKEND_URL = "https://rn-test-project-3c319-default-rtdb.firebaseio.com";

//STORE EXPENSES::

export const storeExpenses = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

//FETCH EXPENSES::

export async function fetchExpenses() {
  try {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    const expenses = [];
    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };

      expenses.push(expenseObj);
    }
    return expenses;
  } catch (error) {
    console.log(error);
  }
}

export const updateExpenseRequest = (id, expenseData) => {
  try {
    return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteExpenseRequest = (id) => {
  try {
    return axios.delete(BACKEND_URL + `expenses/${id}.json`);
  } catch (error) {
    console.log(error.message);
  }
};
