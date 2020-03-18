import React from 'react';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabsNavigator from './MainTabsNavigator';

import AuthScreen from '../auth/AuthViewContainer';
import ProfileScreen from '../profile/ProfileViewContainer';
//import GalleryScreen from '../gallery/GalleryViewContainer';
//import ChatScreen from '../chat/ChatViewContainer';
//import MessagesScreen from '../chat/MessagesViewContainer';
import EventSignUpScreen from '../eventSignUp/EventSignUpViewContainer';
import PaymentHistoryScreen from '../paymentHistory/PaymentHistoryViewContainer';
import ReportDetailScreen from '../reportDetail/ReportDetailViewContainer';
import CreateEventScreen from '../createEvent/CreateEventViewContainer';

import { ExpoIcon } from '../../components/';
import { colors, fonts } from '../../styles';

const eventTabIndex = 1;
const { width } = Dimensions.get('window');
const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabsNavigator,
      navigationOptions: ({ navigation }) => ({
        title: 'Arthur Murray Franchisee',
        headerLeft: null,
        headerRight:
          navigation.state.index === eventTabIndex ? (
            <TouchableOpacity
              onPress={() => navigation.navigate({ routeName: 'CreateEvent' })}
              style={{ paddingRight: 25 }}
            >
              <ExpoIcon name="playlist-add" type="MaterialIcons" color="white" />
            </TouchableOpacity>
          ) : null,
        headerBackground: (
          <Image style={{ flex: 1, width }} source={headerBackground} resizeMode="cover" />
        ),
      }),
    },
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
      },
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
    EventSignUp: {
      screen: EventSignUpScreen,
      navigationOptions: {
        title: 'Event Sign Up',
      },
    },
    PaymentHistory: {
      screen: PaymentHistoryScreen,
    },
    ReportDetail: {
      screen: ReportDetailScreen,
      navigationOptions: {
        title: 'Report Detail',
      },
    },
    CreateEvent: {
      screen: CreateEventScreen,
      navigationOptions: {
        header: null,
      },
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
          style={{ paddingLeft: 25 }}
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
