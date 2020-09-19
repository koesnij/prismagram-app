import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';
import { createStackNavigator } from 'react-navigation-stack';
import { stackStyles } from './config';
import styles from '../styles';

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
      navigationOptions: {
        title: 'Choose Photo',
        headerLeft: () => null,
      },
    },
    UploadPhoto,
  },
  { defaultNavigationOptions: { headerStyle: { ...stackStyles } } }
);
