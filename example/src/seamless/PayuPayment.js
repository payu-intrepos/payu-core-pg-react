import React, { useEffect } from 'react'
import {
    View,
    BackHandler,
    Alert,
    Platform
} from 'react-native'
import WebView from 'react-native-webview'

const PayuPayment = (props) => {
    const { request, onPaymentResponse } = props.route.params

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backHandler);

        return () => BackHandler.removeEventListener('hardwareBackPress', backHandler);
    }, [])


    const backHandler = () => {
        Alert.alert(
            null,
            "Do you really want to cancel the transaction ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        onPaymentResponse({ status: false, message: 'User cancelled' });
                        props.navigation.pop()
                    }
                }
            ]
        );
        return true;
    }

    const onMessage = (response) => {
        onPaymentResponse(JSON.parse(response?.nativeEvent?.data));
        props.navigation.pop();
    }


    return <WebView
        source={{
            uri: request.url,
            method: "POST",
            body: request.data
        }}
        javaScriptEnabled={true}
        onMessage={onMessage}
        scalesPageToFit={false}
    />
}

export default PayuPayment