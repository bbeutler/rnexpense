import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../utlils/date";
import { fetchExpenses } from "../utlils/http";
import { setExpenses } from "../store/expenses";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isLoading, SetIsLoading] = useState(true);
  const [error, SetError] = useState();
  const expensesTotal = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getExpenses() {
      SetIsLoading(true);
      try {
        const expenses_data = await fetchExpenses();
        dispatch(setExpenses(expenses_data));
      } catch (error) {
        SetError("Could not fetch Expenses");
      }
      SetIsLoading(false);
    }
    getExpenses();
  }, []);
  const recentexpenses = expensesTotal.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7daysAgo && expense.date <= today;
  });

  const closeErrorHandler = () => {
    SetError(null);
  };

  let screen = (
    <ExpensesOutput
      expenses={recentexpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No Recent Expenses Available for the last 7 days!"
    />
  );

  if (error && !isLoading) {
    screen = <ErrorOverlay message={error} onConfirm={closeErrorHandler} />;
  }

  if (isLoading) {
    screen = <LoadingOverlay />;
  }

  return <>{screen}</>;
};

export default RecentExpenses;
