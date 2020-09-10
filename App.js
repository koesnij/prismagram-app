import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { ThemeProvider } from 'styled-components';

import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import ApolloClient from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import apolloClientOptions from './apollo';
import styles from './styles';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';

export default function App() {
  // 처음 컴포넌트를 로드했을 때, loaded는 false, client는 null이 됨
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      // Ionicons, Asset(이미지) preload
      await Font.loadAsync({
        ...MaterialCommunityIcons.font,
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
      if (!isLoggedIn || isLoggedIn === 'false') {
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

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
