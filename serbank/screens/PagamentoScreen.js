import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function PagamentoScreen() {
  const { adicionarTransacao, saldo } = useContext(AppContext);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const handlePagar = () => {
    const valorNum = parseFloat(valor);

    if (!descricao || isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Preencha corretamente os dados.');
      return;
    }

    if (valorNum > saldo) {
      Alert.alert('Erro', 'Saldo insuficiente.');
      return;
    }

    adicionarTransacao('Pagamento', valorNum, descricao);
    Alert.alert('Sucesso', 'Pagamento realizado com sucesso.');

    setDescricao('');
    setValor('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento</Text>

      <TextInput 
        placeholder="Descrição (ex: conta de luz)"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput 
        placeholder="Valor"
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handlePagar}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6600',
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#FF6600',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

