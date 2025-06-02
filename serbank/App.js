import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}

