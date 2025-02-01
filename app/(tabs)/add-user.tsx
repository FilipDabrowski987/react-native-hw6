import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";

export default function AddUserScreen() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    
    const handleAddUser = async () => {
        if (!name || !username || !email) {
            setError("Wszystkie pola są wymagane.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Podaj poprawny adres e-mail.");
            return;
        }

        setError("");

        const newUser = {
            name: name,
            username: username,
            email: email,
        };

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
            console.log("New user added:", response.data);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }
 
  const handleClear = () => {
      setName("")
      setUsername("")
      setEmail("")
      setError("")
  }

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Dodaj użytkownika</Text>
          <View>
              <Text>Imię: <TextInput
              style={styles.input}
              onChangeText={setName}
                value={name}
                placeholder="Podaj imię"
                keyboardType="default"
              /></Text>
          </View>
          <View>
              <Text>Nazwa: <TextInput
              style={styles.input}
              onChangeText={setUsername}
                value={username}
                placeholder="Podaj nazwę użytkownika"
                keyboardType="default"
              /></Text>
          </View>
          <View>
              <Text>Email: <TextInput
              style={styles.input}
              onChangeText={setEmail}
                value={email}
                placeholder="Podaj email"
                keyboardType="email-address"
              /></Text>
          </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title="Zapisz"
        onPress={handleAddUser}
        />
        <Button
        title="Wyczyść"
        onPress={handleClear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
  },
  error: {
    color: "red",
    marginBottom: 10,
  }
})