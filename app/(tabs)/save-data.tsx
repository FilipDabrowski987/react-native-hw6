import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Location from 'expo-location';
import * as Camera from 'expo-camera';

export default function SaveDataScreen() {
    const [localization, setLocalization] = useState<Location.LocationObjectCoords | null>(null)
    const [errorMessage, setErroMessage] = useState<string>('')
    
    const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
       
        if (status !== 'granted') {
            setErroMessage('Nie udzielono uprawnień dostępu do lokalizacji')
            return
        }

        const currentLocation = await Location.getCurrentPositionAsync({})

        setLocalization(currentLocation.coords)
        setErroMessage('')
    }

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Lokalizacja GPS</Text>
          <Button title='Pobierz lokalizację' onPress={getLocation} />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          {localization && (
              <Text>Współrzędne: {localization.latitude}, {localization.longitude}</Text>)}
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