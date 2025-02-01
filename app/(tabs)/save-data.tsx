import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function SaveDataScreen() {

//Lokalizacja

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

//Kamera

    const cameraRef = useRef<CameraView | null>(null)
    const [permission, getPermission] = useCameraPermissions()

    useEffect(() => {
        async function getSizes() {
            if (permission?.granted && cameraRef.current) {
                const sizes = await cameraRef.current.getAvailablePictureSizesAsync()
            }
        }
        getSizes()
    }, [permission, cameraRef])

    if (!permission) {
        <View/>
    }

    if (!permission.granted) {
        return (
            <View>
            <Text>Nie udzielono uprawnień dostępu do aparatu</Text>
                <Button title='Udziel uprawnienia' onPress={getPermission} />
            </View>
        )
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