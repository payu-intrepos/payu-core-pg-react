import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';

import { getHash } from '../utils';
import PayUSdk from 'payu-core-pg-react';

const UPI = (props) => {
  const { navigation } = props
  const [vpa, setVpa] = useState('');
  const initiatePayment = () => {

    const requestData = {
      ...props,
      key: props.merchantKey,
      paymentType: 'UPI',
      vpa
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

  const walletMakePayment = (paymentType, bankCode = '') => {
    const requestData = {
      ...props,
      key: props.merchantKey,
      paymentType: paymentType,
      bankCode : bankCode
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
        style={[styles.walletItem, { backgroundColor: '#3A81F1' }]}
        onPress={() => walletMakePayment('UPI', 'Tez')}
      >
        <Text style={styles.walletText}>Google Pay</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.walletItem, { backgroundColor: 'black' }]}
        onPress={() => walletMakePayment('Twid','Twid')}
      >
        <Text style={styles.walletText}>TwidPay</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.walletItem, { backgroundColor: '#6739b7' }]}
        onPress={() => walletMakePayment('Cash Card', 'phonepe')}
      >
        <Text style={styles.walletText}>PhonePe</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Please Enter VPA</Text>
      <TextInput
        style={styles.textinput}
        placeholder="VPA"
        value={vpa}
        onChangeText={setVpa}
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
    marginTop: 20
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

export default UPI;