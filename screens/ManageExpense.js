import { StyleSheet, View } from "react-native";
import { useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../constants/style";
import IconButton from "../components/UI/IconButton";
import { updateExpense, addExpense, deleteExpense } from "../store/expenses";
import { useDispatch, useSelector } from "react-redux";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import {
  storeExpenses,
  updateExpenseRequest,
  deleteExpenseRequest,
} from "../utlils/http";

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState();
  const dispatch = useDispatch();
  const editExpenseId = route.params?.expenseId;
  const isEdited = !!editExpenseId;
  const expensesResult = useSelector((state) => state.expenses);
  const selectedExpenses = expensesResult.find(
    (expense) => expense.id === editExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdited]);

  async function deleteExpenseHandler() {
    SetIsLoading(true);
    try {
      await deleteExpenseRequest(expenseId);
      dispatch(deleteExpense(editExpenseId));
    } catch (error) {
      SetError("Could not delete expense -  please try again later");
      SetIsLoading(false);
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    SetIsLoading(true);
    try {
      if (isEdited) {
        dispatch(
          updateExpense({
            id: editExpenseId,
            data: expenseData,
          })
        );
        await updateExpenseRequest(editExpenseId, expenseData);
      } else {
        const id = await storeExpenses(expenseData);
        dispatch(addExpense({ ...expenseData, id: id }));
      }
    } catch (error) {
      SetError("Could not save data please try again later.");
      SetIsLoading(false);
    }
    navigation.goBack();
  }

  const errorHandler = () => {
    SetError(null);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        manageButtonLabel={isEdited ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpenses}
      />
      <View style={styles.deleteContainer}>
        <IconButton
          icon="trash"
          size={36}
          color={GlobalStyles.colors.error500}
          onPress={deleteExpenseHandler}
        />
      </View>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
