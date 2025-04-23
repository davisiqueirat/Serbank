import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PagamentoScreen = ({ navigation }) => {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const loadSaldo = async () => {
      try {
        const saldoArmazenado = await AsyncStorage.getItem("saldo");
        if (saldoArmazenado !== null) {
          setSaldo(parseFloat(saldoArmazenado));
        }
      } catch (error) {
        console.error("Erro ao carregar o saldo", error);
      }
    };

    loadSaldo();
  }, []);

  const formatarValor = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const adicionarTransacao = async (tipo, valor) => {
    try {
      const transacoes = await AsyncStorage.getItem("transacoes");
      const listaTransacoes = transacoes ? JSON.parse(transacoes) : [];

      const novaTransacao = {
        id: Date.now().toString(),
        tipo,
        valor,
        data: new Date().toLocaleString("pt-BR"),
      };

      const novaLista = [novaTransacao, ...listaTransacoes];
      await AsyncStorage.setItem("transacoes", JSON.stringify(novaLista));
    } catch (error) {
      console.error("Erro ao salvar transação", error);
    }
  };

  const handlePagar = async () => {
    if (descricao && valor) {
      const valorNumerico = parseFloat(
        valor.replace("R$", "").replace(",", ".").trim()
      );
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        Alert.alert("Erro", "Por favor, insira um valor válido.");
        return;
      }

      if (saldo >= valorNumerico) {
        Alert.alert(
          "Confirmar Pagamento",
          `Deseja pagar ${formatarValor(valorNumerico)} para "${descricao}"?`,
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
                  await adicionarTransacao(`Pagamento: ${descricao}`, -valorNumerico);
                  setSaldo(novoSaldo);
                  Alert.alert("Sucesso", `Pagamento de ${formatarValor(valorNumerico)} realizado!`);
                  navigation.goBack();
                } catch (error) {
                  console.error("Erro ao realizar pagamento", error);
                  Alert.alert("Erro", "Erro ao processar o pagamento.");
                }
              },
            },
          ]
        );
      } else {
        Alert.alert("Erro", "Saldo insuficiente para o pagamento.");
      }
    } else {
      Alert.alert("Erro", "Preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pagamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição (ex: Luz, Internet)"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handlePagar}>
        <Text style={styles.buttonText}>Confirmar Pagamento</Text>
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

export default PagamentoScreen;
