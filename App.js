import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components';

import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import ApolloClient from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import apolloClientOptions from './apollo';
import styles from './styles';

export default function App() {
  // 처음 컴포넌트를 로드했을 때, loaded는 false, client는 null이 됨
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // true: in / false: out / null: not checked

  const preLoad = async () => {
    try {
      // Ionicons, Asset(이미지) preload
      await Font.loadAsync({
        ...Ionicons.font,
      });
      await Asset.loadAsync(require('./assets/logo.png')); // 배경, 로고 등
      // Async Storage를 찾으면 cache로 가져옴 (restore)
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      // 클라이언트를 생성
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === null || isLoggedIn === 'false') {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  // 컴포넌트가 마운트될 때 preLoad() 함수를 호출
  useEffect(() => {
    preLoad();
  }, []);

  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false'); // only string
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {isLoggedIn === true ? (
            <TouchableOpacity onPress={logUserOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={logUserIn}>
              <Text>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
