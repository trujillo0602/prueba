import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { firebase, db } from './firebase';



const PantallaListarUsuarios = (props) => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    db.collection("estudiantes").onSnapshot((querySnapshot) => {
      const estudiantes = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombreEstudiante, apPaternoEstudiante, apMaternoEstudiante,
            Matricula, ProgramaEducativo, Cuatrimestre, FotoEstudiante } = doc.data();
        estudiantes.push({
          id: doc.id,
          nombreEstudiante, apPaternoEstudiante, apMaternoEstudiante,
            Matricula, ProgramaEducativo, Cuatrimestre, FotoEstudiante
        });
      });
      setEstudiantes(estudiantes);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("PantallaCrearUsuario")}
        title="Añadir nuevo estudiante"
      />
      {estudiantes.map((estudiante) => {
        return (
          <ListItem
            key={estudiante.id}
            bottomDivider
            onPress={() => {props.navigation.navigate("PantallaUsuarioDetalle", {estudianteId: estudiante.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
               source={{ uri: estudiante.FotoEstudiante }}
               rounded
            />
            <ListItem.Content>
              <ListItem.Title>{estudiante.Matricula}</ListItem.Title>
              <ListItem.Subtitle>{estudiante.nombreEstudiante}{estudiante.apPaternoEstudiante} {estudiante.apMaternoEstudiante}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default PantallaListarUsuarios;