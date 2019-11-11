import dimensions from '../constants/dimensions';
import { Header, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';
import React from 'react';

export default (
  <Header
    iosBarStyle="light-content"
    style={{
      backgroundColor: '#0C223F',
      height: dimensions.headerHeight,
      borderBottomColor: '#FFBF3B',
      borderBottomWidth: 0.5,
    }}
  >
    <Left style={{ flexGrow: 1 }} />
    <Body style={{ flexGrow: 4, alignItems: 'center' }}>
      <Image source={require('../assets/images/header-title.png')} />
    </Body>
    <Right style={{ flexGrow: 1 }} />
  </Header>
);
