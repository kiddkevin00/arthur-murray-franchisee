import header from '../../components/header';
import { Container, Content, Button, Icon, Text } from 'native-base';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UnconnectedDetail extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    email: PropTypes.string,
    displayName: PropTypes.string,
    studio: PropTypes.string,
    createdAt: PropTypes.string,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    email: '',
    displayName: '',
    studio: '',
    createdAt: `${new Date().getFullYear()}`,
  };

  render() {
    const {
      email,
      displayName,
      studio,
      createdAt,
      navigation,
    } = this.props;

    return (
      <Container>
        {header}

        <Content>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/me.png')}
                style={{ width: 78, height: 78, borderRadius: 39 }}
              />
            </View>

            <View style={{ flex: 3 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: 'grey' }}>Studio</Text>
                  <Text>{studio || 'N/A'}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: 'grey' }}>Since</Text>
                  <Text>{createdAt.slice(0, 7)}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Button
                  onPress={() => {}}
                  bordered={true}
                  dark={true}
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    marginLeft: 10,
                    height: 35,
                    borderColor: 'grey',
                  }}
                >
                  <Text>Edit Profile</Text>
                </Button>
                <Button
                  onPress={() => {}}
                  bordered={true}
                  dark={true}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginRight: 10,
                    marginLeft: 10,
                    borderColor: 'grey',
                    height: 35,
                  }}
                >
                  <Icon name="settings" style={{ fontSize: 22, marginTop: -2 }} />
                </Button>
              </View>
            </View>
          </View>

          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              {displayName || 'Welcome!'}
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 15, color: 'grey' }}>{email}</Text>
          </View>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  email: state.me.main.email,
  displayName: state.me.main.first_name,
  studio: state.me.main.studio,
  createdAt: state.me.main.created_at,
});

const Detail = connect(
  mapStateToProps,
  null
)(UnconnectedDetail);

export { UnconnectedDetail, Detail as default };
