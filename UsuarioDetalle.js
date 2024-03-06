import React, { useEffect, useState } from "react";
import {ScrollView, Button,View,Alert, ActivityIndicator,StyleSheet,} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { firebase, db } from './firebase';

const PantallaUsuarioDetalle = (props) => {
  const initialState = {
    id:"",
    nombreEstudiante: "",
    apPaternoEstudiante: "",
    apMaternoEstudiante: "",
    Matricula: "",
    ProgramaEducativo : "",
    Cuatrimestre:"",
    FotoEstudiante:""
  };

  const [estudiante, setEstudiante] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setEstudiante({ ...estudiante, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = db.collection("estudiantes").doc(id);
    const doc = await dbRef.get();
    const estudiante = doc.data();
    setEstudiante({ ...estudiante, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = db.collection("estudiantes").doc(props.route.params.estudianteId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("PantallaListarUsuarios");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Vas a eliminar a este usuario",
      "¿Estas seguro?",
      [
        { text: "Si", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const estudianteRef = db.collection("estudiantes").doc(estudiante.id);
    await estudianteRef.set({
        nombreEstudiante: estudiante.nombreEstudiante,
        apPaternoEstudiante : estudiante.apPaternoEstudiante,
        apMaternoEstudiante: estudiante.apMaternoEstudiante,
        Matricula: estudiante.Matricula,
        ProgramaEducativo: estudiante.ProgramaEducativo,
        Cuatrimestre: estudiante.Cuatrimestre,
        FotoEstudiante: estudiante.FotoEstudiante,
      
    });
    setEstudiante(initialState);
    props.navigation.navigate("PantallaListarUsuarios");
  };
  

  useEffect(() => {
    getUserById(props.route.params.estudianteId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Nombre Usuario"
          style={styles.inputGroup}
          value={estudiante.nombreEstudiante}
        
          onChangeText={(value) => handleTextChange(value, "nombreEstudiante")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Apellido paterno"
          style={styles.inputGroup}
          value={estudiante.apPaternoEstudiante}
          onChangeText={(value) => handleTextChange(value, "apPaternoEstudiante")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Apellido materno"
          style={styles.inputGroup}
          value={estudiante.apMaternoEstudiante}
          onChangeText={(value) => handleTextChange(value, "apMaternoEstudiante")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Matricula"
          style={styles.inputGroup}
          value={estudiante.Matricula}
          onChangeText={(value) => handleTextChange(value, "Matricula")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Programa Educativo"
          style={styles.inputGroup}
          value={estudiante.ProgramaEducativo}
          onChangeText={(value) => handleTextChange(value, "ProgramaEducativo")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Cuatrimestre"
          style={styles.inputGroup}
          value={estudiante.Cuatrimestre}
          onChangeText={(value) => handleTextChange(value, "Cuatrimestre")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Foto Estudiante"
          style={styles.inputGroup}
          value={estudiante.FotoEstudiante}
          onChangeText={(value) => handleTextChange(value, "FotoEstudiante")}
        />
      </View>
      
    
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#ff0000"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default PantallaUsuarioDetalle;