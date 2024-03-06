import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { db } from './firebase'; 

const PantallaCrearUsuario = () => {
    const [state, setState] = useState({ 
        nombreEstudiante: '',
        apPaternoEstudiante: '',
        apMaternoEstudiante: '',
        Matricula: '',
        ProgramaEducativo: '',
        Cuatrimestre: '',
        FotoEstudiante: '',
    });

    const abrirGaleria = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.canceled === true) {
            return;
        }

        const imagePath = pickerResult.assets[0].uri;
        setState({ ...state, FotoEstudiante: imagePath });
        saveImage(imagePath);
    };

    const saveImage = async (imageUri) => {
        try {
            const fileName = imageUri.split('/').pop();
            const newPath = FileSystem.documentDirectory + fileName;
            await FileSystem.copyAsync({
                from: imageUri,
                to: newPath,
            });
        } catch (error) {
            console.error('Error saving image: ', error);
            Alert.alert('Error saving image. Please try again.');
        }
    };

    const handleChangeText = (nombre, value) => {
        setState({ ...state, [nombre]: value });
    };

    const crearNuevoUsuario = async () => {
        const {
            nombreEstudiante,
            apPaternoEstudiante,
            apMaternoEstudiante,
            Matricula,
            ProgramaEducativo,
            Cuatrimestre,
            FotoEstudiante
        } = state;

        if (!nombreEstudiante || !apPaternoEstudiante || !apMaternoEstudiante ||
            !Matricula || !ProgramaEducativo || !Cuatrimestre || !FotoEstudiante) {
            Alert.alert("Por favor, asegúrate de llenar todos los campos");
        } else {
            try {
                await db.collection('estudiantes').add({
                    nombreEstudiante,
                    apPaternoEstudiante,
                    apMaternoEstudiante,
                    Matricula,
                    ProgramaEducativo,
                    Cuatrimestre,
                    FotoEstudiante,
                });
                Alert.alert('Usuario guardado exitosamente');
            } catch (error) {
                console.error('Error al guardar el usuario:', error);
                Alert.alert('Ocurrió un error al guardar el usuario');
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nombre del Estudiante" onChangeText={(value) => handleChangeText('nombreEstudiante', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Apellido paterno" onChangeText={(value) => handleChangeText('apPaternoEstudiante', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Apellido materno" onChangeText={(value) => handleChangeText('apMaternoEstudiante', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Matrícula" onChangeText={(value) => handleChangeText('Matricula', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Programa Educativo" onChangeText={(value) => handleChangeText('ProgramaEducativo', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Cuatrimestre" onChangeText={(value) => handleChangeText('Cuatrimestre', value)} />
            </View>
            <View style={styles.inputGroup}>
                <Button title="Seleccionar una imagen" onPress={abrirGaleria} />
            </View>
            <View style={styles.button}>
                <Button title="Guardar Usuario" onPress={crearNuevoUsuario} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#7093db",
    },
    button: {
        marginBottom: 20,
    },
});

export default PantallaCrearUsuario;
