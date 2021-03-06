/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const SeamlessScreen = ({ navigation }) => {
  const [merchantKey, setMerchantKey] = useState('3TnMpV');
  const [salt, setSalt] = useState('<Please_add_test_salt_here>');
  const [environment, setEnvironment] = useState('Production');
  const [isSandbox, setisSandbox] = useState(false);
  const [userCredentials, setUserCredentials] = useState('umang:arya123');

  const [amount, setAmount] = useState('100');
  const [productInfo, setProductInfo] = useState('Mobile Phone');
  const [firstName, setFirstName] = useState('Testing Name');
  const [txnId, setTxnId] = useState(Date.now().toString() + 'payusdk');
  const [phone, setPhone] = useState('9444444444');
  const [email, setEmail] = useState('info@webinfomart.com');
  const [surl, setSurl] = useState(
    'https://payu-react.herokuapp.com/index.php'
  );

  const [furl, setFurl] = useState(
    'https://payu-react.herokuapp.com/index.php'
  );

  const isVisible = useIsFocused();
  useEffect(() => {
    setTxnId(Date.now().toString() + 'payusdk');
  }, [isVisible]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Key</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Key"
          value={merchantKey}
          onChangeText={setMerchantKey}
        />

        <Text>Salt</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Salt"
          value={salt}
          onChangeText={setSalt}
        />

         <Text>Environment(test/production)</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Environtment"
          value={environment}
          onChangeText={setEnvironment}
        /> 

        <Text>Product Info</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Product Info"
          value={productInfo}
          onChangeText={setProductInfo}
        />

        <Text>Amount</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />

        <Text>Transaction ID</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Transaction"
          value={txnId}
          onChangeText={setTxnId}
        />

        <Text>Firstname</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Firstname"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text>Phone</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Text>Success URL</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Success URL"
          value={surl}
          onChangeText={setSurl}
        />

        <Text>Failure URL</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Failure URL"
          value={furl}
          onChangeText={setFurl}
        />

        <Text>User Credentials</Text>
        <TextInput
          style={styles.textinput}
          placeholder="login:password"
          value={userCredentials}
          onChangeText={setUserCredentials}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title="API"
            onPress={() => {
              navigation.navigate('APIScreen', {
                merchantKey,
                salt,
                isSandbox,
                environment,
                productInfo,
                amount,
                txnId,
                firstName,
                phone,
                email,
                surl,
                furl,
                userCredentials,
              });
            }}
          />
          <Button
            title="Cards"
            onPress={() => {
              navigation.navigate('CardsScreen', {
                merchantKey,
                salt,
                isSandbox,
                environment,
                productInfo,
                amount,
                txnId,
                firstName,
                phone,
                email,
                surl,
                furl,
                userCredentials,
              });
            }}
          />
          <Button
            title="Payment"
            onPress={() => {
              navigation.navigate('PaymentMethods', {
                merchantKey,
                salt,
                isSandbox,
                environment,
                productInfo,
                amount,
                txnId,
                firstName,
                phone,
                email,
                surl,
                furl,
                userCredentials,
              });
            }}
          />
        </View>
      </View>
      <View style={styles.box} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    padding: 16,
  },
  textinput: {
    height: 40,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
  },
  box: {
    height: 300,
  },
});

export default SeamlessScreen;
