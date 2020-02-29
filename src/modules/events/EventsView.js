import { GridRow } from '../../components';
import { colors, fonts } from '../../styles';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const dummyData = [
  {
    id: 1,
    title: 'TEXAS DANCE-O RAMA',
    subtitle: 'Wastin Houston Hotel',
    price: 'Feb 6 - Feb 9, 2020',
    image: require('../../../assets/images/event-sample.png'),
  },
  {
    id: 2,
    title: 'WORLD DANCE-O RAMA',
    subtitle: 'Sheraton Hotel',
    price: 'May 18 - May 22, 2020',
  },
  {
    id: 3,
    title: 'VANCOUVER DANCE-O-RAMA',
    subtitle: 'Westin Bayshore Hotel',
    price: 'Apr 30 - Mar 3, 2020',
  },
  {
    id: 4,
    title: 'FOXWOODS DANCE-O-RAMA',
    subtitle: 'Foxwoods Resort & Casino',
    price: 'May 28 - May 31, 2020',
    image: require('../../../assets/images/event-sample-2.png'),
  },
  {
    id: 5,
    title: 'UNIQUE DANCE-O-RAMA',
    subtitle: 'Hotel Irvine',
    price: 'Jul 16 - Jul 19, 2020',
  },
  {
    id: 6,
    title: 'CIAO AMORE DANCE-O-RAMA',
    subtitle: 'INTERCONTINENTAL HOTEL',
    price: 'Aug 4 - Aug 9, 2020',
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 25,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 8,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 150,
    width: Dimensions.get('window').width / 2 - 45,
    borderRadius: 10,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: colors.whiteTwo,
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.labelTwo,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default class EventsScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  goToEventSignUp = eventInfo => {
    this.props.navigation.navigate({
      routeName: 'EventSignUp',
      params: { ...eventInfo },
    });
  };

  renderRow = rowData => {
    const cellViews = rowData.item.map(item => (
      <TouchableOpacity key={item.id} onPress={() => this.goToEventSignUp(item)}>
        <View style={styles.itemOneContainer}>
          <View style={styles.itemOneImageContainer}>
            <Image style={styles.itemOneImage} source={item.image || require('../../../assets/images/icon.png')} />
          </View>
          <View style={styles.itemOneContent}>
            <Text style={styles.itemOneTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text
              style={styles.itemOneSubTitle}
              styleName="collapsible"
              numberOfLines={3}
            >
              {item.subtitle}
            </Text>
            <Text style={styles.itemOnePrice} numberOfLines={1}>
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));

    return (
      <View key={rowData.item[0].id} style={styles.itemOneRow}>
        {cellViews}
      </View>
    );
  };

  render() {
    const groupedData = GridRow.groupByRows(dummyData, 2);

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => `${item[0] && item[0].id}`}
          style={{
            backgroundColor: colors.whiteTwo,
            paddingHorizontal: 15,
          }}
          data={groupedData}
          renderItem={this.renderRow}
        />
      </View>
    );
  }
}
