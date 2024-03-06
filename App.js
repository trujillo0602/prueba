import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PantallaCrearUsuario from "./screens/CrearUsuario";
import PantallaUsuarioDetalle from "./screens/UsuarioDetalle";
import PantallaListarUsuarios from "./screens/ListarUsuarios";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00fff7",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="PantallaListarUsuarios"
        component={PantallaListarUsuarios}
        options={{ title: "Usuarios" }}
      />
      <Stack.Screen
        name="PantallaCrearUsuario"
        component={PantallaCrearUsuario}
        options={{ title: "Crear un nuevo usuario" }}
      />
      <Stack.Screen
        name="PantallaUsuarioDetalle"
        component={PantallaUsuarioDetalle}
        options={{ title: "Detalle del usuario" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});