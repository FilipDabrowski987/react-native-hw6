import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function TabTwoScreen() {
  const router = useRouter()
  const [name, setName] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.label}>About Page</Text>
      <View style={styles.inputContainer}>
      </View>
      <Button
        title={'Wróć'}
        onPress={() => router.back()} />
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
  }
});
