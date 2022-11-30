import CBWrapper from 'payu-custom-browser-react'
import { displayAlert } from '../utils';
var isAttached=false
import {NativeEventEmitter} from 'react-native';

const setListener=()=>{
    if(isAttached==true){
      return ;
    }
    isAttached=true;
   const eventEmitter=new NativeEventEmitter(CBWrapper);
       eventEmitter.addListener("CBListener",(event)=>{
      console.log(event);
      const rsp=JSON.parse(JSON.stringify(event));
      // const res=rsp.eventType=="onPaymentTerminate"
      // this.displayAlert(' openCB', res+"" );
      if(rsp.eventType=="onPaymentSuccess" || rsp.eventType=="onPaymentFailure"){
        displayAlert('response ', JSON.stringify(rsp));
      }
      
    })
   }


export const initiatePayment= (paymentData,navigation)=>{
    console.log("----------- paymentData---------");
        console.log(paymentData);
        console.log("------------------------------------");
    if (paymentData?.paymentType) {
        if(paymentData.paymentType=="CUSTOMBROWSER"){
            callCB(paymentData["cbParams"]);
        }else{
            navigation.navigate('PayuPayment', {
                request: paymentData,
                onPaymentResponse: (data) => paymentResponse(data)
              })
        }
       
      }
}


const paymentResponse = (data) => {
    console.log(data);
  }
  const callCB=(commonParams)=>{
    const requestData = {
      payu_payment_params: commonParams,
    }
    console.log(requestData);
    CBWrapper.openCB(requestData,
      (error) => {
        console.log("-----------Error openCB---------");
        console.log(error);
        console.log("------------------------------------");
      },
      (payuResponse) => {
       
        console.log("-----------Success openCB---------");
        console.log(payuResponse);
        console.log("--------------------------------------");
        // this.displayAlert('Success openCB', JSON.stringify(params));
       setListener();
      }
      );
  }
