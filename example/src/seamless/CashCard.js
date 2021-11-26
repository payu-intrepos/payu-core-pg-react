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

import PayUSdk from 'payu-core-pg-react';
import { getHash } from '../utils';

const CashCard = (props) => {
  const { navigation } = props;
  const [bankCode, setBankCode] = useState('SBIB');

  const initiatePayment = () => {
    
    const requestData = {
      ...props,
      key: props.merchantKey,
      paymentType: 'Cash Card',
      SURL: props.surl,
      FURL: props.furl,
      transactionID: props.txnId,
      bankCode
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
        <Text>Bank Code</Text>
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

export default CashCard;