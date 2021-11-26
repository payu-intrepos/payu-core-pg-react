import React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';

import { getHash } from '../utils';
import PayUSdk from 'payu-core-pg-react';

const Wallets = (props) => {
  const { navigation } = props

  const walletMakePayment = (paymentType) => {

    const requestData = {
      ...props,
      key: props.merchantKey,
      paymentType,
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
      <TouchableOpacity
        style={[styles.walletItem, { backgroundColor: '#96b720' }]}
        onPress={() => walletMakePayment('PayU Money')}
      >
        <Text style={styles.walletText}>PayU Money</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.walletItem, { backgroundColor: '#e2315b' }]}
        onPress={() => walletMakePayment('LazyPay')}
      >
        <Text style={styles.walletText}>LazyPay</Text>
      </TouchableOpacity>
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
  walletItem: {
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'white',
    marginTop: 8
  },
  walletText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 12
  }
});

export default Wallets;