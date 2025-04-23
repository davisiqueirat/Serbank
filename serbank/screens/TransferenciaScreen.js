import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransferenciaScreen = ({ navigation }) => {
  const [numeroConta, setNumeroConta] = useState("");
  const [valor, setValor] = useState("");
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const loadSaldo = async () => {
      try {
        const saldoArmazenado = await AsyncStorage.getItem("saldo");
        if (saldoArmazenado !== null) {
          setSaldo(parseFloat(saldoArmazenado));
        } else {
          console.log("Nenhum saldo encontrado no AsyncStorage");
        }
      } catch (error) {
        console.error("Erro ao carregar o saldo", error);
      }
    };

    loadSaldo();
  }, []);

  const formatarValor = (valor) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  };

  const handleTransferir = async () => {
    if (numeroConta && valor) {
      const valorNumerico = parseFloat(valor.replace("R$", "").replace(",", ".").trim());
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        Alert.alert("Erro", "Por favor, insira um valor válido.");
        return;
      }

      if (saldo >= valorNumerico) {
        Alert.alert(
          "Confirmar Transferência",
          `Você está prestes a transferir ${formatarValor(valorNumerico)} para a conta ${numeroConta}.`,
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Confirmar",
              onPress: async () => {
                const novoSaldo = saldo - valorNumerico;

                try {
                  await AsyncStorage.setItem("saldo", novoSaldo.toString());
                  setSaldo(novoSaldo);

                  const historico = JSON.parse(await AsyncStorage.getItem("historico")) || [];
                  const novaTransacao = {
                    data: new Date().toLocaleString(),
                    tipo: "Saída",
                    valor: valorNumerico,
                  };
                  historico.push(novaTransacao);

                  await AsyncStorage.setItem("historico", JSON.stringify(historico));

                  Alert.alert("Sucesso", `Transferência de ${formatarValor(valorNumerico)} realizada com sucesso!`);
                  navigation.goBack();
                } catch (error) {
                  console.error("Erro ao atualizar o saldo", error);
                  Alert.alert("Erro", "Ocorreu um erro ao realizar a transferência.");
                }
              },
            },
          ]
        );
      } else {
        Alert.alert("Erro", "Saldo insuficiente para realizar a transferência.");
      }
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transferência</Text>
      <TextInput
        style={styles.input}
        placeholder="Número da Conta"
        value={numeroConta}
        onChangeText={setNumeroConta}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={(text) => {
          const valorFormatado = text.replace(/[^\d,]/g, "").replace(/^(\d{1,3})(\d{3})/, "$1,$2");
          setValor(valorFormatado);
        }}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleTransferir}>
        <Text style={styles.buttonText}>Confirmar Transferência</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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

export default TransferenciaScreen;
