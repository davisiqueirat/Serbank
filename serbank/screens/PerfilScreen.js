import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function PerfilScreen({ navigation }) {
  const [localizacao, setLocalizacao] = useState(null);

  useEffect(() => {
    const obterLocalizacao = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocalizacao('Permissão negada');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
      const cidade = reverseGeocode[0]?.city || 'Desconhecida';
      const estado = reverseGeocode[0]?.region || '';
      setLocalizacao(`${cidade} - ${estado}`);
    };

    obterLocalizacao();
  }, []);

  const confirmarLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: logout }
      ]
    );
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@logado');
    Alert.alert('Logout', 'Você saiu da sua conta.');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>João da Silva</Text>

        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.value}>joao.silva@exemplo.com</Text>

        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.value}>123.456.789-00</Text>

        <Text style={styles.label}>Localização atual:</Text>
        <Text style={styles.value}>
          {localizacao ? localizacao : 'Carregando...'}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={confirmarLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60,
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 30,
    color: '#FF6600', textAlign: 'center'
  },
  infoBox: {
    backgroundColor: '#f4f4f4', padding: 20,
    borderRadius: 10, marginBottom: 30
  },
  label: {
    fontWeight: 'bold', fontSize: 16, color: '#333', marginTop: 10
  },
  value: {
    fontSize: 16, color: '#555'
  },
  button: {
    backgroundColor: '#FF6600',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16
  }
});
