/* eslint-disable react/prop-types */

import ExpoIcon from '../components/ExpoIcon';
import LoginScreen from '../containers/Profile/Login';
import DetailScreen from '../containers/Profile/Detail';
import LinksScreen from '../containers/Links';
import SettingsScreen from '../containers/Settings';
import colors from '../constants/colors';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import React from 'react';

const platformSpecificConfig = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ProfileStack = createStackNavigator(
  {
    Login: LoginScreen,
    Detail: DetailScreen,
  },
  {
    ...platformSpecificConfig,
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerTitle: 'Arthur Murray Franchisee',
    },
  }
);

ProfileStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let tabBarVisible;

  if (routeName === 'Login') {
    tabBarVisible = false;
  } else {
    tabBarVisible = true;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
      <ExpoIcon
        name="profile"
        type="AntDesign"
        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
        style={{ marginBottom: -3 }}
      />
    ),
  };
};

ProfileStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  {
    ...platformSpecificConfig,
    initialRouteName: 'Links',
    defaultNavigationOptions: {
      headerTitle: 'Arthur Murray Franchisee',
    },
  }
);

LinksStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let tabBarVisible;

  if (routeName === 'SOME_ROUTE') {
    tabBarVisible = false;
  } else {
    tabBarVisible = true;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Links',
    tabBarIcon: ({ focused }) => (
      <ExpoIcon
        name="link"
        type="Feather"
        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
        style={{ marginBottom: -3 }}
      />
    ),
  };
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    ...platformSpecificConfig,
    initialRouteName: 'Settings',
    defaultNavigationOptions: {
      headerTitle: 'Arthur Murray Franchisee',
    },
  }
);

SettingsStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let tabBarVisible;

  if (routeName === 'SOME_ROUTE') {
    tabBarVisible = false;
  } else {
    tabBarVisible = true;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
      <ExpoIcon
        name="settings"
        type="Feather"
        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
        style={{ marginBottom: -3 }}
      />
    ),
  };
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    Profile: ProfileStack,
    Link: LinksStack,
    Settings: SettingsStack,
  },
  {
    initialRouteName: 'Profile',
  }
);

tabNavigator.path = '';

export { tabNavigator as default };
