# payu-core-pg-react
React Native SDK for PayU's Core PG SDK
https://www.npmjs.com/package/payu-core-pg-react

For hash generation testing salt needs to be put in HASH generation method and one set of test creds can be found on gitbook- https://payumobile.gitbook.io/sdk-integration/test-merchant-list

## Installation
```sh
npm install https://github.com/payu-intrepos/payu-core-pg-react.git
```

## Usage
### Pre-defined UI flow

```js
import PayuSdk from "payu-core-pg-react";

// ...

PayUSdk.launchPaymentFlow(
  {
      environment,
      amount,
      key,
      txnId,
      phone,
      email,
      surl,
      furl,
      productInfo,
      firstname,
      salt,
      primaryColor,
      secondaryColor,
      merchantName,
  },
  (response) => {
      console.log(JSON.stringify(response));
  },
  (error) => {
      Alert.alert('Error', JSON.stringify(error));
  }
);
```

### Seamless UI samples
Depending on paymentType params can differ.

E.g for Credit / Debit Cards payment type:

```js
import PayuSdk from "payu-sdk";

let paymentType = 'Credit / Debit Cards';

PayUSdk.makePayment(
  {
    key,
    environment,
    amount,
    txnId,
    phone,
    email,
    surl,
    furl,
    productInfo,
    firstname,
    salt,
    paymentType,
    nameOnCard,
    cardNumber,
    expiryYear,
    expiryMonth,
    CVV,
  },
  (response) => {
    console.log(JSON.stringify(response));
  },
  (err) => {
    Alert.alert('Error', JSON.stringify(err));
  }
);
```

For `Net Banking` payment type:
```js

let paymentType = 'Net Banking';

PayUSdk.makePayment(
  {
    key: apikey,
    environment,
    amount,
    txnId,
    phone,
    email,
    surl,
    furl,
    productInfo,
    firstname,
    salt,
    paymentType,
    bankCode,
  },
  (response) => {
    console.log(JSON.stringify(response));
  },
  (err) => {
    Alert.alert('Error', JSON.stringify(err));
  }
);
```


## Example App Setup

## Requirements
Requirements
- node 14 +
- react-native
- android studio for ( android )
- xcode, cocoapods for ( ios )
## Setup Commands
```bash
     git clone {{repo}} payuSdkExample
     cd payuSdkExample
     npm i
     cd example
     npm i
     cd ios
     pod install
```

## Issues while building on MacOs ( Apple silicon [M1] )
- use resota 2
- PayUbizCoreKitImportsdk ( Import Issue )
- RTCBridge ( Import Issue )
- Framework Not found
` exmaple images are in image folder `
