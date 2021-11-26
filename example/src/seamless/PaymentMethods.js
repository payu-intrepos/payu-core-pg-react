import React from 'react';
import { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CCDC from './CCDC';
import NetBanking from './NetBanking';
import UPI from './UPI';
import Emi from './Emi';
import NoCostEmi from './NoCostEmi';
import CashCard from './CashCard';

import Wallets from './Wallets';

const Tab = createMaterialTopTabNavigator();

const PaymentMethods = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: `Key: ${route.params.merchantKey} | Amount: ${route.params.amount}`,
    });
  });

  const data = {
    ...route.params,
    navigation
  }

  return (
    <Tab.Navigator tabBarOptions={{ scrollEnabled: true }} title="Title">
      <Tab.Screen name="CCDC" children={() => <CCDC {...data} />} />
      <Tab.Screen
        name="NetBanking"
        children={() => <NetBanking {...data} />}
      />
      <Tab.Screen name="UPI" children={() => <UPI {...data} />} />
      <Tab.Screen
        name="Wallets"
        children={() => <Wallets {...data} />}
      />
      <Tab.Screen
        name="Emi"
        children={() => <Emi {...data} />}
      />
      <Tab.Screen
        name="NoCostEmi"
        children={() => <NoCostEmi {...data} />}
      />
      <Tab.Screen
        name="CashCard"
        children={() => <CashCard {...data} />}
      />
    </Tab.Navigator>
  );
};

export default PaymentMethods;
