/* eslint-disable react/prop-types */

import ExpoIcon from '../components/ExpoIcon';
import HomeScreen from '../containers/Home';
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

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    ...platformSpecificConfig,
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTitle: 'Arthur Murray Franchisee',
    },
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let tabBarVisible;

  if (routeName === 'SOME_ROUTE') {
    tabBarVisible = false;
  } else {
    tabBarVisible = true;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <ExpoIcon
        name="cow"
        type="MaterialCommunityIcons"
        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
        style={{ marginBottom: -3 }}
      />
    ),
  };
};

HomeStack.path = '';

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

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export { tabNavigator as default };
