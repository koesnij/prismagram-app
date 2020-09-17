import React from 'react';
import { Text, Image, View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import PostDetail from '../screens/PostDetail';
import MessagesLink from '../components/MessagesLink';
import NavIcon from '../components/NavIcon';
import { stackStyles } from './config';
import styles from '../styles';
import UserDetail from '../screens/UserDetail';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig,
        },
      },
      PostDetail: {
        screen: PostDetail,
        navigationOptions: {
          title: 'Photo',
        },
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam('username'),
        }),
      },
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: ' ',
        headerTintColor: styles.blackColor,
        headerStyle: { ...stackStyles },
      },
    }
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: () => <MessagesLink />,
        headerTitle: () => (
          <Image
            style={{ width: 90 }}
            resizeMode="contain"
            source={require('../assets/logo.png')}
          />
        ),
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon name={focused ? 'home' : 'home-outline'} />
        ),
      },
    },
    Search: {
      screen: stackFactory(Search, { headerBackTitle: null }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon name={focused ? 'image-search' : 'image-search-outline'} />
        ),
      },
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate('PhotoNavigation');
        },
        tabBarIcon: ({ focused }) => (
          <NavIcon name={focused ? 'plus-circle' : 'plus-circle-outline'} />
        ),
      },
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: 'Notifications',
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon name={focused ? 'heart' : 'heart-outline'} />
        ),
      },
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: 'Profile',
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            name={focused ? 'account-circle' : 'account-circle-outline'}
          />
        ),
      },
    },
  },
  {
    //configration options
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#FAFAFA',
      },
    },
  }
);
