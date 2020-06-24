import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "./Input";
import { getFormattedDate } from "../../utlils/date";
import { GlobalStyles } from "../../constants/style";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  manageButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function SubmitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    //VALIDATIONS

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date === "Invalid Date";
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert("Input values not valid", "Kindly check the input values.");
      setInputs((currInputs) => {
        return {
          amount: {
            value: currInputs.amount.value,
            isValid: isAmountValid,
          },
          date: {
            value: currInputs.date.value,
            isValid: isDateValid,
          },
          description: {
            value: currInputs.description.value,
            isValid: isDescriptionValid,
          },
        };
      });
    }

    onSubmit(expenseData);
  }

  const FormIsValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputBox}>
        <Input
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {FormIsValid && (
        <Text style={styles.errorText}>
          Kindly check the inputs and ensure no field is empty
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.Button} onPress={onCancel} mode="flat">
          Cancel
        </Button>
        <Button style={styles.Button} onPress={SubmitHandler}>
          {manageButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 24,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error50,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
