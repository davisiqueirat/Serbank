import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function HistoricoScreen() {
  const { historico } = useContext(AppContext);
  const [filtro, setFiltro] = useState('Todos');

  const filtrarHistorico = () => {
    if (filtro === 'Todos') return historico;
    return historico.filter(item => item.tipo === filtro);
  };

  const historicoFiltrado = filtrarHistorico();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Transações</Text>

      <View style={styles.filtros}>
        {['Todos', 'Transferência', 'Pagamento', 'Depósito'].map(tipo => (
          <TouchableOpacity
            key={tipo}
            style={[styles.filtroBotao, filtro === tipo && styles.filtroSelecionado]}
            onPress={() => setFiltro(tipo)}
          >
            <Text style={styles.filtroTexto}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {historicoFiltrado.length === 0 ? (
        <Text style={styles.empty}>Nenhuma transação encontrada.</Text>
      ) : (
        <FlatList
          data={historicoFiltrado}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const icone =
              item.tipo === 'Depósito' ? '⬆' :
              item.tipo === 'Transferência' ? '🔁' :
              item.tipo === 'Pagamento' ? '💳' : '💰';

            const sinal = item.tipo === 'Depósito' ? '+' : '-';
            const cor = item.tipo === 'Depósito' ? styles.positivo : styles.negativo;

            return (
              <View style={styles.item}>
                <View style={styles.left}>
                  <Text style={styles.tipo}>{icone} {item.tipo}</Text>

                  {item.destino && (
                    <Text style={styles.destino}>
                      {item.tipo === 'Transferência' ? `Para: ${item.destino}` : item.destino}
                    </Text>
                  )}

                  <Text style={styles.data}>{item.data}</Text>

                  {item.localizacao && (
                    <Text style={styles.local}>📍 {item.localizacao}</Text>
                  )}
                </View>

                <Text style={[styles.valor, cor]}>
                  {sinal} R$ {parseFloat(item.valor).toFixed(2)}
                </Text>
              </View>
            );
          }}
        />
      )}
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
  filtroBotao: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6600'
  },
  filtroSelecionado: {
    backgroundColor: '#FF6600'
  },
  filtroTexto: {
    color: '#FF6600',
    fontWeight: 'bold'
  },
  empty: {
    textAlign: 'center', color: '#999', marginTop: 50, fontSize: 16
  },
  item: {
    backgroundColor: '#f4f4f4', padding: 15, borderRadius: 8,
    marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'
  },
  left: {
    flexDirection: 'column'
  },
  tipo: {
    fontWeight: 'bold', fontSize: 16
  },
  destino: {
    color: '#333', marginTop: 2
  },
  data: {
    color: '#888', marginTop: 4, fontSize: 12
  },
  local: {
    color: '#666', fontSize: 12, marginTop: 2
  },
  valor: {
    fontSize: 16, fontWeight: 'bold'
  },
  positivo: {
    color: '#4caf50'
  },
  negativo: {
    color: '#e53935'
  }
});
