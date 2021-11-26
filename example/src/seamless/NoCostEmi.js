import React from 'react';
import { useState } from 'react';

import {
  Button,
  Text,
  TextInput,
  StyleSheet,
  View,
  Alert,
  ScrollView,
} from 'react-native';

import { getHash } from '../utils';
import PayUSdk from 'payu-core-pg-react';

const NoCostEmi = (props) => {
  const { navigation } = props
  const [cardNumber, setCardNumber] = useState('5123456789012346');
  const [expiryYear, setExpiryYear] = useState('2023');
  const [expiryMonth, setExpiryMonth] = useState('06');
  const [cvv, setCvv] = useState('123');
  const [nameOnCard, setNameOnCard] = useState('Ram');
  const [bankCode, setBankCode] = useState('SBIB');
  const [subventionAmount, setSubventionAmount] = useState('40')

  const initiatePayment = () => {
    const requestData = {
      ...props,
      key: props.merchantKey,
      paymentType: 'No Cost EMI',
      nameOnCard,
      cardNumber,
      expiryYear,
      expiryMonth,
      cvv,
      bankCode,
      subventionAmount
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Credit Card Details</Text>
        <Text>Number</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Number"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <Text>Expires Month</Text>
        <TextInput
          style={styles.textinput}
          placeholder="MM"
          value={expiryMonth}
          onChangeText={setExpiryMonth}
        />
        <Text>Expires Year</Text>
        <TextInput
          style={styles.textinput}
          placeholder="YY"
          value={expiryYear}
          onChangeText={setExpiryYear}
        />
        <Text>CVV</Text>
        <TextInput
          style={styles.textinput}
          placeholder="cvv"
          value={cvv}
          onChangeText={setCvv}
        />
        <Text>Name</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Name"
          value={nameOnCard}
          onChangeText={setNameOnCard}
        />
        <Text>Bank Code</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Bank Code"
          value={bankCode}
          onChangeText={setBankCode}
        />
        <Text>Subvention Amount</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Nam"
          value={subventionAmount}
          onChangeText={setSubventionAmount}
        />
        <Button
          title="Pay"
          onPress={() => {
            initiatePayment()
          }}
        />
      </View>
      <View style={styles.box} />
    </ScrollView>
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
  box: {
    height: 300,
  },
});

export default NoCostEmi;