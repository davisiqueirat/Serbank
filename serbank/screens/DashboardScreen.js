import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [saldo, setSaldo] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const carregarSaldo = async () => {
        try {
          const saldoArmazenado = await AsyncStorage.getItem("saldo");
          if (saldoArmazenado !== null) {
            setSaldo(parseFloat(saldoArmazenado));
          }
        } catch (error) {
          console.error("Erro ao carregar o saldo:", error);
        }
      };

      carregarSaldo();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Serbank</Text>
      </View>

      <View style={styles.saldoContainer}>
        <Text style={styles.saldoText}>Saldo Atual:</Text>
        <Text style={styles.saldoValor}>R$ {saldo.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Transferencia")}
      >
        <Text style={styles.buttonText}>Transferir</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Pagamento")}
      >
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Historico")}
      >
        <Text style={styles.buttonText}>Histórico de Transações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    backgroundColor: "#1281cb", 
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  saldoContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  saldoText: {
    fontSize: 18,
    color: "#333",
  },
  saldoValor: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#055194", 
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#1281cb", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#dc3545", 
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DashboardScreen;
