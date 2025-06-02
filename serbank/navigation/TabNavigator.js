import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import TransferenciaScreen from '../screens/TransferenciaScreen';
import PagamentoScreen from '../screens/PagamentoScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import DepositoScreen from '../screens/DepositoScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'Transferência':
              iconName = 'swap-horizontal';
              break;
            case 'Depósito':
              iconName = 'cash';
              break;
            case 'Pagamento':
              iconName = 'card';
              break;
            case 'Historico':
              iconName = 'time';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6600',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
          paddingBottom: 6,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Transferência" component={TransferenciaScreen} />
      <Tab.Screen name="Depósito" component={DepositoScreen} />
      <Tab.Screen name="Pagamento" component={PagamentoScreen} />
      <Tab.Screen name="Historico" component={HistoricoScreen} />
    </Tab.Navigator>
  );
}