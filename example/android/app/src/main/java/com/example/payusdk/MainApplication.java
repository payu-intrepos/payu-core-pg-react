package com.example.payusdk;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.payusdk.PayuSdkPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }


        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }



  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager()); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.payusdkExample.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  @JavascriptInterface
  public void onFailure(String result) {

    Log.d("Vinoth", "onFailure: Vinoth" + result);
  }

  @JavascriptInterface
  public void onPayuFailure(String result) {

    Log.d("Vinoth", "onPayuFailure: Vinoth" + result);
  }

  @JavascriptInterface
  public void onSuccess() {
    this.onSuccess("");
  }

  @JavascriptInterface
  public void onPayuSuccess(String result) {

    Log.d("Vinoth", "onPayuSuccess: Vinoth" + result);
  }

  @JavascriptInterface
  public void onSuccess(String result) {

    Log.d("Vinoth", "onSuccess: Vinoth" + result);
  }

  @JavascriptInterface
  public void onCancel() {
    this.onCancel("");
  }

  @JavascriptInterface
  public void onCancel(final String result) {
    Log.d("Vinoth", "onCancel: Vinoth" + result);
  }


}
