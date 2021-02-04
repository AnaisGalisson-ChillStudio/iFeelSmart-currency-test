import React from "react"
import { Provider } from "react-redux";
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { useState } from "react";
import { Image, LogBox, SafeAreaView } from "react-native";
import HomeView from "./src/pages";
import { I18nextProvider } from "react-i18next"
import i18next from "./src/config/i18n"
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from "./src/models/store";
import { ROUTES } from "./src/routes";
import { Spinner } from "./src/components/spinner"

export default function App() {
  const Stack = createStackNavigator();
  const [isReady, setIsReady] = useState(false)

  const cacheImages = (images) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  // Add images here to cache them
  const loadAssets = async () => {
    const imageAssets = cacheImages([
      //  require('./assets/images/image.png'),

    ]);

    // Add font here
    const fontAssets = Font.loadAsync({
      InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
      InterBold: require('./assets/fonts/Inter-Bold.ttf'),
      InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf')
      // Roboto: require("native-base/Fonts/Roboto.ttf"),
      // ...MaterialCommunityIcons.font,
    })


    Promise.all([fontAssets, ...imageAssets]).then(() => {
      setIsReady(true)
    }).catch(e => {
      console.log("ASSETS LOADING ERROR ", e)
    })
  }

  return (
    isReady ?
      <NavigationContainer >
        <Provider store={store}>
          <I18nextProvider i18n={i18next}>
            <SafeAreaView style={{ flex: 1 }}>
              <Spinner />
              <Stack.Navigator initialRouteName={ROUTES.index} screenOptions={{ headerShown: false }} >
                <Stack.Screen name={ROUTES.index} component={HomeView} options={{ header: null }} />
              </Stack.Navigator>
            </SafeAreaView>
          </I18nextProvider>
        </Provider>
      </NavigationContainer>


      :
      <AppLoading
        onError={console.warn}
        startAsync={loadAssets}
        onFinish={() => console.log("Assets loaded")}
      />
  )
}

