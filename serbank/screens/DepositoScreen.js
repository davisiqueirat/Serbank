import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { AppContext } from '../context/AppContext';

export default function DepositoScreen() {
  const { adicionarTransacao } = useContext(AppContext);
  const [valor, setValor] = useState('');

  const handleDepositar = async () => {
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Digite um valor válido.');
      return;
    }

    let locationText = 'Localização desconhecida';
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        locationText = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
      }
    } catch (e) {
      console.log('Erro ao obter localização:', e);
    }

    adicionarTransacao('Depósito', valorNum, 'Depósito direto', locationText);
    Alert.alert('Sucesso', 'Depósito realizado com sucesso.');
    setValor('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Depósito</Text>

      <TextInput
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleDepositar}>
        <Text style={styles.buttonText}>Depositar</Text>
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
