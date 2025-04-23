import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoricoScreen = () => {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    const loadTransacoes = async () => {
      try {
        const transacoesSalvas = await AsyncStorage.getItem("transacoes");
        if (transacoesSalvas !== null) {
          const lista = JSON.parse(transacoesSalvas);
          console.log("Transações carregadas:", lista);
          setTransacoes(lista);
        }
      } catch (error) {
        console.error("Erro ao carregar transações", error);
        Alert.alert("Erro", "Ocorreu um erro ao carregar o histórico.");
      }
    };

    loadTransacoes();
  }, []);

  const renderItem = ({ item }) => {
    const tipoLower = item.tipo?.toLowerCase() || "";
    const isEntrada = tipoLower.includes("entrada") || tipoLower.includes("recebido") || tipoLower.includes("depósito");

    return (
      <View
        style={[
          styles.transacaoContainer,
          isEntrada ? styles.entrada : styles.saida,
        ]}
      >
        <Text style={styles.tipoText}>{item.tipo}</Text>
        <Text style={styles.valorText}>
          {item.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
        <Text style={styles.dataText}>{item.data}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórico de Transações</Text>

      {transacoes.length === 0 ? (
        <Text style={styles.noTransactionsText}>Nenhuma transação realizada.</Text>
      ) : (
        <FlatList
          data={transacoes}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1281cb",
  },
  transacaoContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  entrada: {
    backgroundColor: "#e7f9e7",
    borderLeftWidth: 5,
    borderLeftColor: "#28a745",
  },
  saida: {
    backgroundColor: "#fce4e4",
    borderLeftWidth: 5,
    borderLeftColor: "#dc3545",
  },
  tipoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  valorText: {
    fontSize: 16,
    marginTop: 5,
    color: "#333",
  },
  dataText: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
  noTransactionsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
});

export default HistoricoScreen;
