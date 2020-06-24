import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expenses);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No Registered Expenses Found!"
    />
  );
};

export default AllExpenses;
