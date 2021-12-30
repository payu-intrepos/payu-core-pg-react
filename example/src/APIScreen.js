/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Platform } from 'react-native'

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import moment from 'moment'

import PayUSdk from 'payu-core-pg-react';
import {
  API_GET_EMI_AMOUNT_ACCORDING_INTEREST,
  CHECK_IS_DOMESTIC,
  CHECK_OFFER_DETAILS,
  CHECK_OFFER_STATUS,
  DEFAULT,
  getLookupHash,
  getWebHash,
  getUserCardHash,
  GET_BIN_INFO,
  GET_CHECKOUT_DETAILS,
  GET_TRANSACTION_INFO,
  PAYMENT_RELATED_DETAILS_FOR_MOBILE_SDK,
  VAS_FOR_MOBILE_SDK,
  VERIFY_PAYMENT,
  getEMIDetailHash,
  getCheckIsDomesticHash,
  getBinInfoHash,
  getGetTransactionInfoHash,
  getCheckoutDetailsHash,
  getOfferHash,
  getVerifyHash,
  getVasHash,
GET_USER_CARDS } from './utils';

const APIScreen = ({ route }) => {
  const [jsonTextInputValue,
    setJsonTextInputValue] = useState('');
  let onApiCall = async (feature) => {
    let { merchantKey, salt, isSandbox, userCredentials, environment } = route.params;
    let requestData = {
      key: merchantKey,
      isSandbox,
      salt,
      environment,
    };
    setJsonTextInputValue('');
    try {

      if (feature === 'payment_options') {
       
        requestData = {
          ...requestData,
          userCredentials: userCredentials,
          command: PAYMENT_RELATED_DETAILS_FOR_MOBILE_SDK,
          hash:getWebHash(requestData)
        }
        
        
        const options = await PayUSdk.fetchPaymentOptions({
          ...requestData,
          hash: getWebHash(requestData)
        });
  
        setJsonTextInputValue(JSON.stringify(options));
    
      } else  if (feature === 'get_user_cards') {
       
        requestData = {
          ...requestData,
          userCredentials: userCredentials,
          command: GET_USER_CARDS,
          hash: getUserCardHash(requestData)
        }
        
        
        const options = await PayUSdk.getUserCards({
          ...requestData,
          hash: getUserCardHash(requestData)
        });
  
        setJsonTextInputValue(JSON.stringify(options));
    
      } 
      else if (feature === 'vas') {

        requestData = {
          ...requestData,
          var1: 'default',
          command: VAS_FOR_MOBILE_SDK,
        }

        const response = await PayUSdk.vas({
          ...requestData,
          hash: getVasHash(requestData)
        });

        setJsonTextInputValue(JSON.stringify(response));
        console.log(response);
      } else if (feature === 'check_is_domestic') {

        requestData = {
          ...requestData,
          cardNumber: '622018',
          command: CHECK_IS_DOMESTIC
        }
        const response = await PayUSdk.checkIsDomestic({
          ...requestData,
          hash: getCheckIsDomesticHash(requestData)
        });
        setJsonTextInputValue(JSON.stringify(response));

      } else if (feature === 'get_bin_info') {
        requestData = {
          ...requestData,
          isSIInfo: '1',
          cardNumber: '555555',
          command: GET_BIN_INFO
        }

        const response = await PayUSdk.getBinInfo({
          ...requestData,
          hash: getBinInfoHash(requestData)
        });

        setJsonTextInputValue(JSON.stringify(response));

      } else if (feature === 'get_transaction_info') {

        let startTime = new Date();
        startTime.setTime(startTime.getTime() - 2 * 24 * 60 * 60 * 1000);
        let endTime = new Date();

        requestData = {
          ...requestData,
          startTime: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
          command: GET_TRANSACTION_INFO
        }

        const response = await PayUSdk.getTransactionInfo({
          ...requestData,
          hash: getGetTransactionInfoHash(requestData)
        });

        setJsonTextInputValue(JSON.stringify(response));


      } else if (feature === 'get_emi_details') {

        requestData = {
          ...requestData,
          amount: '2000',
          command: API_GET_EMI_AMOUNT_ACCORDING_INTEREST
        }
        const response = await PayUSdk.getEMIDetails({
          ...requestData,
          hash: getEMIDetailHash(requestData)
        });

        setJsonTextInputValue(JSON.stringify(response));

      } else if (feature === 'get_checkout_details') {

        requestData = {
          ...requestData,
          var1: JSON.stringify({"useCase":
          {"getExtendedPaymentDetails":true,
          "getTaxSpecification":true,
          "checkDownStatus":true,
          "getAdditionalCharges":true},
          "requestId":"211219214632",
          "customerDetails":{"mobile":"9876543210"},
          "transactionDetails":{"amount":"5000"}
        }),
          command: GET_CHECKOUT_DETAILS
        }
        const response = await PayUSdk.getCheckoutDetails({
          ...requestData,
          hash: getCheckoutDetailsHash(requestData)
        });
        setJsonTextInputValue(JSON.stringify(response));

      } else if (feature === 'check_offer_detail') {

          // requestData = {
          //     ...requestData,
          //     offerKey: 'cardOfferKey@8643',
          //     cardNumber: "5123456789012346",
          //     paymentType: 'Credit / Debit Cards',
          //     amount: '5000',
          //     command: CHECK_OFFER_DETAILS
          // }

          requestData = {
                  ...requestData,
                  offerKey: 'cardOfferKey@8643',
                  cardToken: "111bce624e01fb4fde3ea2",
                  userCredentials:userCredentials,
                  paymentType: 'Saved Cards',
                  amount: '5000',
                  command: CHECK_OFFER_DETAILS
          }

// only android has
// main net bankig

          // requestData = {
          //   ...requestData,
          //   offerKey: 'cashBackccdcnb@8651',
          //   bankCode: "AXIB",
          //   paymentType: 'NB',
          //   amount: '5000',
          //   command: CHECK_OFFER_DETAILS
          // }

//
//

          // requestData = {
          //   ...requestData,
          //   offerKey: '@7283',
          //   bankCode: "643567vbhbvgh5678gvv77b",
          //   paymentType: 'Net Banking',
          //   command: CHECK_OFFER_DETAILS
          // }

        // ------
        const response = await PayUSdk.checkOfferDetails({
          ...requestData,
          hash: getOfferHash(requestData)
        });

        setJsonTextInputValue(JSON.stringify(response));

      } else if (feature === 'verify_payment') {

        requestData = {
          ...requestData,
          txnId: '1628684808250payusdk',
          command: VERIFY_PAYMENT
        }
        const response = await PayUSdk.verifyPayment({
          ...requestData,
          hash: getVerifyHash(requestData)
        });
        setJsonTextInputValue(JSON.stringify(response));

      } else if (feature === 'check_offer_status') {

        // requestData = {
        //   ...requestData,
        //   offerKey: 'cardOfferKey@8643',
        //   amount: '5000',
        //   var3: 'CC',
        //   var4: 'CC',
        //   var5: '5123456789012346',
        //   hash: getWebHash(requestData),
        //   command: CHECK_OFFER_STATUS
        // }

            requestData = {
              ...requestData,
              offerKey: 'cardOfferKey@8643',
              amount: '5000',
              cardNumber: "5123456789012346",
              paymentType: 'CC',
              command: CHECK_OFFER_STATUS
            }
        

      //  } else if(2) {
      //    requestData = {
      //      ...requestData,
      //        amount: 5000,
      //        offerKey: '@7283',
      //      cardToken: "643567vbhbvgh5678gvv77b",
      //      paymentType: 'Saved Cards',
      //      command: CHECK_OFFER_STATUS
      //    }
      //  } else {
      //      requestData = {
      //        ...requestData,
      //        amount: 5000,
      //        offerKey: '@7283',
      //        bankCode: "643567vbhbvgh5678gvv77b",
      //        paymentType: 'Net Banking',
      //        command: CHECK_OFFER_STATUS
      //      }
      //  }

        const response = await PayUSdk.getOfferStatus({
          ...requestData,
          hash: getOfferHash(requestData)
        });

        setJsonTextInputValue(JSON.stringify(response));

      } else if (feature === 'lookup_api') {
        const merchantOrderId = "OBE-JU89-13151-1100900221";
        const currency = "INR";
        const baseAmount = "10000"


        const lookupRequestData = {
          "merchantAccessKey": "E5ABOXOWAAZNXB6JEF5Z",
          "baseAmount": {
            "value": baseAmount,
            "currency": currency
          },
          // "cardBin":"513382", // Need cardbin for DCC product
          "merchantOrderId": merchantOrderId,
          "productType": "MCP" // Use product DCC or MCP
        }
        const lookupHash = "61335dc17e4f678ab03a9380b6ce0bcb363bb672"
        //  getLookupHash("e425e539233044146a2d185a346978794afd7c66", `${currency}${merchantOrderId}${baseAmount}`)

        const response = await PayUSdk.lookupAPI({
          ...requestData,
          var1: JSON.stringify({
            ...lookupRequestData,
            signature: lookupHash
          }),
          hash: lookupHash
        });
        setJsonTextInputValue(JSON.stringify(response));

      }
    } catch (error) {

      console.log({error});
      Alert.alert('Error Occurened in Js Please check Logs.');
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={[
          { key: 'payment_options', title: 'Fetch payment options' },
          { key: 'vas', title: 'VAS (AXIB)' },
          { key: 'get_emi_details', title: 'Get EMI details (amount 2000)' },
          {
            key: 'check_is_domestic',
            title: 'Check is domestic (Card: 512345)',
          },
          {
            key: 'get_bin_info',
            title: 'Get Bin Info (Card: 450503)',
          },
          {
            key: 'get_transaction_info',
            title: 'Get Transaction Info (last 2 days)',
          }, {
            key: 'get_checkout_details',
            title: 'Checkout details',
          },
          {
            key: 'check_offer_detail',
            title: 'Check offer detail (@11311)',
          },
          {
            key: 'verify_payment',
            title: 'Verify Payment(1628684808250payusdk)',
          },
          {
            key: 'check_offer_status',
            title: 'Check Offer Status',
          },
          {
            key: 'lookup_api',
            title: 'LookUp API',
          },
          {
            key: 'get_user_cards',
            title: 'Get User Cards',
          }
        ]}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                onApiCall(item.key);
              }}
            >
              <Text style={styles.item}>{item.title || item.key}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ flex: 1, padding: 16, backgroundColor: '#ccc' }}>
        <Text>JSON Output</Text>
        <ScrollView>
          <Text style={{ lineHeight: 24, fontSize: 16, maxHeight: 5000}}>{jsonTextInputValue}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  item: {
    padding: 16,
    fontSize: 20,
  },
  textArea: {
    justifyContent: 'flex-start',
    height: '100%',
    fontSize: 16,
  },
});

export default APIScreen;
