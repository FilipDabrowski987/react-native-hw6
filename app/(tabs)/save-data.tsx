import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from "react-native-safe-area-context";

export default function SaveDataScreen() {

//Lokalizacja

    const [localization, setLocalization] = useState<Location.LocationObjectCoords | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')
    
    const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
       
        if (status !== 'granted') {
            setErrorMessage('Nie udzielono uprawnień dostępu do lokalizacji')
            return
        }

        const currentLocation = await Location.getCurrentPositionAsync({})

        setLocalization(currentLocation.coords)
        setErrorMessage('')
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

    if (!permission?.granted) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            <View>
            <Text style={styles.text}>Nie udzielono uprawnień dostępu do aparatu</Text>
                <Button title='Udziel dostępu' onPress={() => getPermission()} />
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        <View>                
                <Text style={styles.title}>Lokalizacja GPS</Text>
                <Button title='Pobierz lokalizację' onPress={getLocation} />
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                {localization && (
                    <Text>Współrzędne: {localization.latitude}, {localization.longitude}</Text>)}
            </View>
            <View>
                <View style={styles.cameraContainer}>
                    <CameraView style={styles.camera} ref={cameraRef} />
                </View>
                <View>
                    <Button title='Zrób zdjęcie' onPress={async () => {
                        const photo = await cameraRef.current?.takePictureAsync()
                        alert(`Zdjęcie zrobiono w wymiarach: ${photo.width}x${photo?.height}`)
                    }} />
                </View>
            </View>             
        </View>
        </SafeAreaView>
    )
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
  error: {
    color: "red",
    marginBottom: 10,
    },
  text: {
    color: "white"
    },
    camera: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'gray'
  },
    cameraContainer: {
    width: 300,
    height: 300,
    marginTop: 50,
  },
})