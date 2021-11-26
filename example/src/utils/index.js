import { sha512 } from 'js-sha512';
import { Platform } from 'react-native';

export const DEFAULT = "default"
export const PAYMENT_RELATED_DETAILS_FOR_MOBILE_SDK = 'payment_related_details_for_mobile_sdk'
export const VAS_FOR_MOBILE_SDK = "vas_for_mobile_sdk";
export const API_GET_EMI_AMOUNT_ACCORDING_INTEREST = "getEmiAmountAccordingToInterest";
export const CHECK_IS_DOMESTIC = "check_isDomestic";
export const GET_BIN_INFO = "getBinInfo";
export const CHECK_OFFER_DETAILS = "check_offer_details";
export const GET_TRANSACTION_INFO = "get_transaction_info";
export const GET_CHECKOUT_DETAILS = "get_checkout_details";
export const VERIFY_PAYMENT = "verify_payment";
export const CHECK_OFFER_STATUS = "check_offer_status";
export const GET_USER_CARDS = "get_user_cards";
export const SAVE_USER_CARD = "save_user_card";
export const EDIT_USER_CARD = "edit_user_card";
export const DELETE_USER_CARD = "delete_user_card";

export const getHash = (payUData) => {
    payUData = getDefault(payUData);
    var hashString = `${payUData.key}|${payUData.txnId}|${payUData.amount}|${payUData.productInfo}|${payUData.firstName}|${payUData.email}|${payUData.udf1}|${payUData.udf2}|${payUData.udf3}|${payUData.udf4}|${payUData.udf5}|${payUData.udf6}|${payUData.udf7}|${payUData.udf8}|${payUData.udf9}|${payUData.udf10}|${payUData.salt}`;
    if (payUData.subventionAmount) {
        hashString = `${hashString}|${payUData.subventionAmount}`
    }
    return sha512(hashString);
}

export const getDefault = (payUData) => {
    payUData.udf1 = payUData.udf1 ? payUData.udf1 : '';
    payUData.udf2 = payUData.udf2 ? payUData.udf2 : '';
    payUData.udf3 = payUData.udf3 ? payUData.udf3 : '';
    payUData.udf4 = payUData.udf4 ? payUData.udf4 : '';
    payUData.udf5 = payUData.udf5 ? payUData.udf5 : '';
    payUData.udf6 = payUData.udf6 ? payUData.udf6 : '';
    payUData.udf7 = payUData.udf7 ? payUData.udf7 : '';
    payUData.udf8 = payUData.udf8 ? payUData.udf8 : '';
    payUData.udf9 = payUData.udf9 ? payUData.udf9 : '';
    payUData.udf10 = payUData.udf10 ? payUData.udf10 : '';
    payUData.subventionAmount = payUData.subventionAmount ? payUData.subventionAmount : '';
    payUData.isSandbox = payUData.isSandbox ? payUData.isSandbox : false;
    return payUData;
}

export const getWebHash = (payUData) => {
    payUData.var1 = (payUData.userCredentials)? payUData.userCredentials : DEFAULT
    var hashString = `${payUData.key}|${payUData.command}|${payUData.var1}|${payUData.salt}`;

    return sha512(hashString);
}

export const getVasHash = (payUData) => {
  if(payUData.var1 == null || payUData.var1.length == 0){
    payUData.var1 = DEFAULT
  }
  var hashString = `${payUData.key}|${payUData.command}|${payUData.var1}|${payUData.salt}`;

  return sha512(hashString);
}

export const getOfferHash = (payUData) => {

  if(!payUData.offerKey){
    alert('OfferKeyMissing');
    return false;
  }

  var hashString = `${payUData.key}|${payUData.command}|${payUData.offerKey}|${payUData.salt}`;
  return sha512(hashString);
}

export const getEMIDetailHash = (payUData) => {
  payUData.var1 = (payUData.amount)? payUData.amount : DEFAULT
  var hashString = `${payUData.key}|${payUData.command}|${payUData.var1}|${payUData.salt}`;
  return sha512(hashString);
}

export const getCheckIsDomesticHash = (payUData) => {
  payUData.var1 = (payUData.cardNumber)? payUData.cardNumber : DEFAULT
  var hashString = `${payUData.key}|${payUData.command}|${payUData.var1}|${payUData.salt}`;
  return sha512(hashString);
}

export const getBinInfoHash = (payUData) => {
  payUData.var1 = (payUData.isSIInfo)? payUData.isSIInfo : DEFAULT
  var hashString = `${payUData.key}|${payUData.command}|${payUData.var1}|${payUData.salt}`;

  return sha512(hashString);
}

export const getGetTransactionInfoHash = (payUData) => {
  payUData.var1 = (payUData.startTime)? payUData.startTime : DEFAULT
  var hashString = `${payUData.key}|${payUData.command}|${payUData.var1}|${payUData.salt}`;

  return sha512(hashString);
}

export const getCheckoutDetailsHash = (payUData) => {
  payUData.var1 = (payUData.var1)? payUData.var1 : DEFAULT
  var hashString = `${payUData.key}|${payUData.command}|${payUData.var1}|${payUData.salt}`;
  return sha512(hashString);
}

export const getVerifyHash = (payUData) => {
  var hashString = `${payUData.key}|${payUData.command}|${payUData.txnId}|${payUData.salt}`;
  return sha512(hashString);
}

export const getUserCardHash = (payUData) => {
  var hashString = `${payUData.key}|${payUData.command}|${payUData.userCredentials}|${payUData.salt}`;
  return sha512(hashString);
}

export const getLookupHash = (key, payUData) => {
    var hashString = `${payUData.key}|${payUData.command}|${payUData.var1}|${payUData.salt}`;
    return sha512.hmac(key, hashString);
}

// export const getWebDefault = (payUData) => {
//     payUData.var1 = payUData.var1 ? payUData.var1 : '';
//     payUData.var2 = payUData.var2 ? payUData.var2 : '';
//     payUData.var3 = payUData.var3 ? payUData.var3 : '';
//     payUData.var4 = payUData.var4 ? payUData.var4 : '';
//     payUData.var4 = payUData.var4 ? payUData.var4 : '';
//     return payUData;
// }
