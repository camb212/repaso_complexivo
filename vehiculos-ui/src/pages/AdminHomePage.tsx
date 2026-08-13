import { View, Text, Button, StyleSheet } from "react-native";

export default function HomePage({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sistema de Alquiler de Vehículos
      </Text>

      <Text style={styles.subtitle}>
        Operaciones y registros
      </Text>

      <View style={styles.button}>
        <Button
          title="Bitácora de Flota"
          onPress={() => navigation.navigate("FleetLogs")}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Eventos de Alquiler"
          onPress={() => navigation.navigate("RentalEvents")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginVertical: 8,
  },
});