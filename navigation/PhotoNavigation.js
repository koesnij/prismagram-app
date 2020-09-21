import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';
import { createStackNavigator } from 'react-navigation-stack';
import { stackStyles } from './config';
import styles from '../styles';
import { Button, Text } from 'react-native';

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: 'Take',
      },
    },
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: 'Select',
      },
    },
  },
  {
    navigationOptions: { headerStyle: { ...stackStyles } },
    tabBarPosition: 'bottom',
    tabBarOptions: {
      indicatorStyle: {
        ...stackStyles,
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: '600',
      },
      style: {
        paddingBottom: 20,
        ...stackStyles,
      },
    },
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: ({ navigation }) => ({
        title: 'Choose Photo',
        headerLeft: () => '',
        // headerRight: () => (
        //   <Button
        //     title="Next"
        //     onPress={() => navigation.navigate('UploadPhoto')}
        //   />
        // ),
      }),
    },
    Upload: {
      screen: UploadPhoto,
      navigationOptions: {
        title: 'Upload',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: { ...stackStyles },
      headerTintColor: styles.blackColor,
    },
  }
);
