import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";

export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function HomeScreen() {
  const [id, setId] = useState("")
  const [error, setError] = useState("")
  const [users, setUsers] = useState<TUser[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, [])

  const handleSetId = () => {

  const idNumber = Number(id);

    if (!/^\d+$/.test(id)) {
      setError("Proszę wpisać liczbę całkowitą")
    } else if (idNumber < 1 || idNumber > 1000) {
    setError("ID musi być liczbą z zakresu od 1 do 1000.");
    } else {
      setError("")
      router.push(`/details/${id}`)
      setId("")
    }
  };

  const handleClearId = () => {
    setId("")
    setError("")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista użytkowników</Text>
      <FlatList
        data={users}
        keyExtractor={user=>user.id.toString()}
        renderItem={({ item }) => <View style={styles.userItem}><Button title={item.name} onPress={() => router.push(`/details/${item.id}`)} /></View>}
      />
      <Button
        title={'Idź do about'}
        onPress={() => router.push('/about')} />
      <TextInput
              style={styles.input}
              onChangeText={setId}
                value={id}
                placeholder="Wpisz ID"
                keyboardType="numeric"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title="Wyczyść"
        onPress={handleClearId}
      />
      <Button
        title="Przejdź"
        onPress={handleSetId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    paddingHorizontal: 20,
    paddingTop: 70,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
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
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "darkgray", 
  }
})