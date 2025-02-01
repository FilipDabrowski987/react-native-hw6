import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function MyTabScreen() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

const handleSubmit = () => {
    // Prosta walidacja: sprawdzamy, czy email zawiera "@" i ma co najmniej 3 znaki
    if (email.length < 3) {
      setError('Email musi mieć co najmniej 3 znaki.');
      Alert.alert('Błąd', 'Email musi mieć co najmniej 3 znaki.');
    } else if (!email.includes('@')) {
      setError('Email musi zawierać znak "@".');
      Alert.alert('Błąd', 'Email musi zawierać znak "@".');
    } else {
      setError(null); // Resetowanie błędu, jeśli wszystko jest w porządku
      Alert.alert('Sukces', `Twój email to ${email}!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wprowadź email</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
      </View>
      <Button
        title={'Wyślij'}
        onPress={handleSubmit} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  }
});
