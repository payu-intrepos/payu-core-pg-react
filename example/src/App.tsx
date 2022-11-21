import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SeamlessScreen from './SeamlessScreen';
import LaunchScreen from './LaunchScreen';
import APIScreen from './APIScreen.js';
import CardsScreen from './CardsScreen';
import PaymentMethods from './seamless/PaymentMethods';
import PayuPayment from './seamless/PayuPayment';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="LaunchScreen"
          component={LaunchScreen}
          options={{ title: 'LaunchScreen' }}
        />
        <Stack.Screen
          name="SeamlessScreen"
          component={SeamlessScreen}
          options={{ title: 'Seamless Integration' }}
        />
        <Stack.Screen
          name="APIScreen"
          component={APIScreen}
          options={{ title: 'API Samples' }}
        />
        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethods}
          options={{ title: 'Payment Methods' }}
        />
        <Stack.Screen
          name="CardsScreen"
          component={CardsScreen}
          options={{ title: 'Manage Cards' }}
        />
        <Stack.Screen
          name="PayuPayment"
          component={PayuPayment}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
