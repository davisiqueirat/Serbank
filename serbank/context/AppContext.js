import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);

  
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const saldoSalvo = await AsyncStorage.getItem('@saldo');
        const historicoSalvo = await AsyncStorage.getItem('@historico');

        if (saldoSalvo !== null) setSaldo(parseFloat(saldoSalvo));
        if (historicoSalvo !== null) setHistorico(JSON.parse(historicoSalvo));
      } catch (e) {
        console.log('Erro ao carregar dados:', e);
      }
    };
    carregarDados();
  }, []);

 
  useEffect(() => {
    AsyncStorage.setItem('@saldo', saldo.toString());
    AsyncStorage.setItem('@historico', JSON.stringify(historico));
  }, [saldo, historico]);

  
  const adicionarTransacao = (tipo, valor, destino, localizacao = '') => {
    const novaTransacao = {
      id: Date.now(),
      tipo,
      valor,
      destino,
      localizacao,
      data: new Date().toLocaleString('pt-BR')
    };

    setHistorico([novaTransacao, ...historico]);

    if (tipo === 'Depósito') {
      setSaldo(prev => prev + valor);
    } else {
      setSaldo(prev => prev - valor);
    }
  };

  return (
    <AppContext.Provider value={{
      saldo,
      setSaldo,
      historico,
      adicionarTransacao
    }}>
      {children}
    </AppContext.Provider>
  );
};
