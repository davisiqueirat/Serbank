import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const usuarios = [
  {
    cpf: "123.456.789-00",
    senha: "casa",
    nome: "Victor Gomes",
  },
];

const LoginScreen = ({ navigation }) => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const formatarCpf = (cpf) => {
    const cpfLimpo = cpf.replace(/\D/g, "");

    if (cpfLimpo.length <= 3) {
      return cpfLimpo;
    }
    if (cpfLimpo.length <= 6) {
      return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3)}`;
    }
    if (cpfLimpo.length <= 9) {
      return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6)}`;
    }
    return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6, 9)}-${cpfLimpo.slice(9, 11)}`;
  };

  const handleLogin = async () => {
    const usuario = usuarios.find(
      (u) => u.cpf === cpf && u.senha === senha
    );

    if (usuario) {
      try {
        await AsyncStorage.setItem("saldo", "1500.75");
        await AsyncStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        const historico = await AsyncStorage.getItem("historico");
        if (!historico) {
          await AsyncStorage.setItem("historico", JSON.stringify([]));
        }

        navigation.replace("Dashboard");
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage", error);
        Alert.alert("Erro", "Não foi possível salvar os dados.");
      }
    } else {
      Alert.alert("Erro", "CPF ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo ao Serbank</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(formatarCpf(text))}
        keyboardType="numeric"
        maxLength={14}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1281cb",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#0e71b9",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#1281cb",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
