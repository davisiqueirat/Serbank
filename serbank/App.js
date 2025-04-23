import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import TransferenciaScreen from "./screens/TransferenciaScreen";
import PagamentoScreen from "./screens/PagamentoScreen"; 
import HistoricoScreen from "./screens/HistoricoScreen"; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Transferencia" component={TransferenciaScreen} />
        <Stack.Screen name="Pagamento" component={PagamentoScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
