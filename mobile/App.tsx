import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import './global.css';

// Import your screens
import Login from './src/auth/Login';

// Define your route names here for TypeScript checking (Optional but recommended)
export type RootStackParamList = {
  Login: undefined;
  Home: undefined; // Placeholder for where they go after login
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        
        
      </Stack.Navigator>
      
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}