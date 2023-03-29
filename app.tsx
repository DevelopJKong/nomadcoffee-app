import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Root from './src/navigations/root.navigation';
import { NavigationContainer } from '@react-navigation/native';

interface IAppLoader {
  children: React.ReactNode;
  image: { uri: string };
}

SplashScreen.preventAutoHideAsync().catch(error => {
  /* reloading the app might trigger some race conditions, ignore them */
  const typedError = error as Error;
  console.error(typedError);
});

const App = () => {
  return (
    <AnimatedAppLoader image={{ uri: 'https://i.imgur.com/dtuN6qr.png[/img]' }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </SafeAreaProvider>
    </AnimatedAppLoader>
  );
};

function AnimatedAppLoader({ children, image }: IAppLoader) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(image.uri).downloadAsync();
      setSplashReady(true);
    }

    prepare().then(res => {
      console.log(res);
    });
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }: IAppLoader) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }).start(() => setIsAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Load stuff
      // await Promise.all([]);
    } catch (error) {
      // handle errors
      const typedError = error as Error;
      console.error(typedError);
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isAnimationComplete && (
        <Animated.View
          pointerEvents="none" // eslint-disable-line
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'white',
              opacity: 1,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              opacity: animation,
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default App;
