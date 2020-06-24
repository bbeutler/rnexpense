import { View, Text, StyleSheet, Button } from "react-native";
import { GlobalStyles } from "../../constants/style";

const ErrorOverlay = ({ message, onConfirm }) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text style={[styles.text, styles.title]}>An Error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm} title="Okay" />
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
