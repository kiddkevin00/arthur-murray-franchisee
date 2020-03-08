import React from 'react';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

//import GalleryScreen from '../gallery/GalleryViewContainer';
import ProfileScreen from '../profile/ProfileViewContainer';
import EventSignUpScreen from '../eventSignUp/EventSignUpViewContainer';
//import ChatScreen from '../chat/ChatViewContainer';
//import MessagesScreen from '../chat/MessagesViewContainer';
import ReportDetailScreen from '../reportDetail/ReportDetailViewContainer';
import AuthScreen from '../auth/AuthViewContainer';
import PaymentHistoryScreen from '../paymentHistory/PaymentHistoryViewContainer';

import { colors, fonts } from '../../styles';

const { width } = Dimensions.get('window');

const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: () => ({
        title: 'Arthur Murray Franchisee',
        headerLeft: null,
        headerBackground: (
          <Image
            style={{ flex: 1, width }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
        headerLeft: null,
      },
    },
    //Gallery: {
    //  screen: GalleryScreen,
    //  navigationOptions: {
    //    title: 'Gallery',
    //  },
    //},
    EventSignUp: {
      screen: EventSignUpScreen,
      navigationOptions: {
        title: 'Event Sign Up',
      },
    },
    //Chat: {
    //  screen: ChatScreen,
    //  navigationOptions: {
    //    title: 'Chat',
    //  },
    //},
    //Messages: {
    //  screen: MessagesScreen,
    //  navigationOptions: {
    //    title: 'Messages',
    //  },
    //},
    ReportDetail: {
      screen: ReportDetailScreen,
      navigationOptions: {
        title: 'Detail',
      },
    },
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
      },
    },
    PaymentHistory: {
      screen: PaymentHistoryScreen,
    },
  },
  {
    initialRouteName: 'Auth',
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      headerBackground: (
        <Image
          style={{ flex: 1, width }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
