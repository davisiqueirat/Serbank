import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function DashboardScreen({ navigation }) {
  const { saldo } = useContext(AppContext);
  const [cotacoes, setCotacoes] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarCotacoes = async () => {
      try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
        const data = await response.json();

        if (data && data.USDBRL && data.EURBRL) {
          setCotacoes({
            USD: parseFloat(data.USDBRL.bid),
            EUR: parseFloat(data.EURBRL.bid)
          });
        } else {
          console.log('Resposta inesperada da API:', data);
        }
      } catch (error) {
        console.log('Erro ao buscar cotações:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarCotacoes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao SerBank!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Saldo disponível</Text>
        <Text style={styles.saldo}>
          R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cotacoesTitulo}>Cotações (1 BRL)</Text>
        {carregando ? (
          <ActivityIndicator color="#FF6600" size="small" />
        ) : cotacoes ? (
          <>
            <Text style={styles.cotacao}>USD: {cotacoes.USD.toFixed(2)}</Text>
            <Text style={styles.cotacao}>EUR: {cotacoes.EUR.toFixed(2)}</Text>
          </>
        ) : (
          <Text style={styles.cotacao}>Não foi possível carregar as cotações.</Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Transferência')}>
          <Text style={styles.buttonText}>Transferir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pagamento')}>
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historico')}>
          <Text style={styles.buttonText}>Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    color: '#666',
    fontSize: 16,
    marginBottom: 6,
  },
  saldo: {
    color: '#4caf50',
    fontSize: 32,
    fontWeight: 'bold',
  },
  cotacoesTitulo: {
    fontSize: 16,
    color: '#FF6600',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  cotacao: {
    fontSize: 14,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF6600',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});