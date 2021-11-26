import React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';

import { getHash } from '../utils';
import PayUSdk from 'payu-core-pg-react';

const NetBanking = (props) => {
  const { navigation } = props
  const [bankCode, setBankCode] = useState('SBIB');

  const initiatePayment = () => {

    const requestData = {
      ...props,
      key: props.merchantKey,
      paymentType: 'Net Banking',
      bankCode,
    }
    PayUSdk.makePayment(
      {
        ...requestData,
        hash: getHash(requestData)
      },
      (response) => {
        const responseData = JSON.parse(response)
        if (responseData?.data) {
          navigation.navigate('PayuPayment', {
            request: responseData,
            onPaymentResponse: (data) => paymentResponse(data)
          })
        }
      },
      (err) => {
        Alert.alert('Error', JSON.stringify(err));
      }
    );
  }

  const paymentResponse = (data) => {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Choose your bank (e.g, SBIB, AXIB, HDFB, ICIB)
      </Text>
      <TextInput
        style={styles.textinput}
        placeholder="Bank Code"
        value={bankCode}
        onChangeText={setBankCode}
      />
      <Button
        title="Pay"
        onPress={() => {
          initiatePayment()
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textinput: {
    height: 40,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    paddingBottom: 16,
    fontSize: 20,
  },
});

export default NetBanking;