import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';

import { getHash } from '../utils';
import { commonPaymentParam ,getPaymentHash,getVPAHash,displayAlert} from '../utils';
import  PayUUPI  from 'payu-upi-react';
const UPI = (routeData,props) => {
  const { navigation } = props
  const [vpa, setVpa] = useState('');
var route=routeData;
  if(routeData.route != undefined && routeData.route.params !=undefined){
    route=routeData.route.params;
  }
  console.log("navigation====>"+JSON.stringify(route));
  const initiatePayment = (mode,packageName="null") => {
    var commonParams=commonPaymentParam(route);
    commonParams["hashes"]["payment"]=getPaymentHash(commonParams,route.salt);
    commonParams["payment_mode"]=mode;
    if(mode=="upi"){
      commonParams["vpa"]=vpa;
    }
    
    if(packageName != "null"){
      commonParams["package_name"]=packageName;
    }
    
    const requestData = {
      payu_payment_params: commonParams,
    }

  console.log(requestData);
   PayUUPI.makeUPIPayment(requestData,
      (error) => {
        console.log("-----------Error "+mode+"---------");
        console.log(error);
       
        displayAlert('Error '+mode, JSON.stringify(error));
        console.log("------------------------------------------");

      },
      (params) => {
        console.log("-----------Success "+mode+"---------");
        console.log(params);
      
        displayAlert('Success '+mode, JSON.stringify(params));
        console.log("------------------------------------------");
      }
    );
  }

  const validateVPA = () => {
    console.log('Button Tapped validate VPA');
   
    var commonParams = commonPaymentParam(route);
    commonParams["vpa"]=vpa;
    commonParams["hashes"]["payment"]=getPaymentHash(commonParams,route.salt);
    commonParams["hashes"]["validate_vpa"]=getVPAHash(commonParams,route.salt);
    const requestData = {
      payu_payment_params: commonParams,
    }
    PayUUPI.validateVPA(
      requestData,
      (error) => {
        console.log("-----------Error validateVPA---------");
        console.log(error);
        console.log("-------------------------------------");
        displayAlert('Error validateVPA', JSON.stringify(error));
      },
      (params) => {
        console.log("-----------Success validateVPA---------");
        console.log(params);
        console.log("---------------------------------------");
        displayAlert('Success validateVPA', JSON.stringify(params));
      }
    );
  }

  const intentApps = () => {
    console.log('Button Tapped IntentApps');
    PayUUPI.intentApps((intentApps) => {
        console.log("-----------Success intentApps---------");
        console.log(JSON.stringify(intentApps));
        console.log("---------------------------------------");
        displayAlert('Success intentApps', JSON.stringify(intentApps));
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
        onPress={() => initiatePayment('INTENT', 'com.google.android.apps.nbu.paisa.user')}
      >
        <Text style={styles.walletText}>Google Pay</Text>
      </TouchableOpacity>
     
      <TouchableOpacity
        style={[styles.walletItem, { backgroundColor: '#6739b7' }]}
        onPress={() => initiatePayment('INTENT', 'com.phonepe.app')}
      >
        <Text style={styles.walletText}>PhonePe</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[styles.walletItem, { backgroundColor: 'black' }]}
        onPress={() => intentApps()}
      >
        <Text style={styles.walletText}>Get UPI Apps List</Text>
      </TouchableOpacity>

      
      <Text style={styles.title}>Please Enter VPA</Text>
      <TextInput
        style={styles.textinput}
        placeholder="VPA"
        value={vpa}
        onChangeText={setVpa}
      />
      <Button
        style={[styles.walletItem, { backgroundColor: 'green' }]}
        onPress={() => validateVPA()}
        title="Validate VPA"
      >
        
      </Button>
      <Text ></Text>
      <Button
        title="Pay via Intent"
        onPress={() => {
          initiatePayment("INTENT",null)
        }}
      />
      <Text ></Text>
       <Button
        title="Pay via collect"
        onPress={() => {
          initiatePayment("upi")
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