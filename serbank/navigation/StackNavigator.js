import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import DepositoScreen from '../screens/DepositoScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Depósito"
        component={DepositoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

