import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const verificarLogin = async () => {
      const logado = await AsyncStorage.getItem('@logado');
      if (logado === 'true') {
        navigation.replace('MainApp');
      }
    };
    verificarLogin();
  }, []);

  const handleLogin = async () => {
    if (usuario === 'admin' && senha === '1234') {
      await AsyncStorage.setItem('@logado', 'true');
      navigation.replace('MainApp');
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.box}>
        <Text style={styles.title}>SerBank</Text>

        <TextInput
          placeholder="Usuário"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6600',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#FF6600',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
