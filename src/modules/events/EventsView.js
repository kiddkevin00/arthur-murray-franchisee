import { RadioGroup, GridRow } from '../../components';
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

const dummyData = [
  {
    id: 1,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image:
      'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
  },
  {
    id: 2,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-26549.jpg',
  },
  {
    id: 3,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-30360.jpg',
  },
  {
    id: 4,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: 'green',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-37839.jpg',
  },
  {
    id: 5,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-69212.jpg',
  },
  {
    id: 6,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-108061.jpg',
  },
  {
    id: 7,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-126371.jpg',
  },
  {
    id: 8,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-165888.jpg',
  },
  {
    id: 9,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-167854.jpg',
  },
  {
    id: 10,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: 'green',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-173427.jpg',
  },
  {
    id: 11,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-175696.jpg',
  },
  {
    id: 12,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-175733.jpg',
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
  _getRenderItemFunction = () =>
    [this.renderRowOne, this.renderRowTwo, this.renderRowThree][
      this.props.tabIndex
    ];

  _openArticle = article => {
    this.props.navigation.navigate({
      routeName: 'Article',
      params: { ...article },
    });
  };

  renderRowOne = rowData => {
    const cellViews = rowData.item.map(item => (
      <TouchableOpacity key={item.id} onPress={() => this._openArticle(item)}>
        <View style={styles.itemOneContainer}>
          <View style={styles.itemOneImageContainer}>
            <Image style={styles.itemOneImage} source={{ uri: item.image }} />
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

  renderRowTwo = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemTwoContainer}
      onPress={() => this._openArticle(item)}
    >
      <View style={styles.itemTwoContent}>
        <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
        <View
          //start={{ x: 0, y: 0 }}
          //end={{ x: 1, y: 1 }}
          colors={[colors.primaryGradientStart, colors.primaryGradientEnd]}
          style={[styles.itemTwoOverlay, { backgroundColor: colors.primaryGradientStart }]}
        />
        <Text style={styles.itemTwoTitle}>{item.title}</Text>
        <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text>
        <Text style={styles.itemTwoPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  renderRowThree = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      onPress={() => this._openArticle(item)}
    >
      <View style={styles.itemThreeSubContainer}>
        <Image source={{ uri: item.image }} style={styles.itemThreeImage} />
        <View style={styles.itemThreeContent}>
          <Text style={styles.itemThreeBrand}>{item.brand}</Text>
          <View>
            <Text style={styles.itemThreeTitle}>{item.title}</Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>
          <View style={styles.itemThreeMetaContainer}>
            {item.badge && (
              <View
                style={[
                  styles.badge,
                  item.badge === 'NEW' && { backgroundColor: colors.labelOne },
                ]}
              >
                <Text
                  style={{ fontSize: 10, color: colors.white }}
                  styleName="bright"
                >
                  {item.badge}
                </Text>
              </View>
            )}
            <Text style={styles.itemThreePrice}>{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    const groupedData =
      this.props.tabIndex === 0
        ? GridRow.groupByRows(dummyData, 2)
        : dummyData;

    return (
      <View style={styles.container}>
        <View style={{ height: 50 }}>
          <RadioGroup
            selectedIndex={this.props.tabIndex}
            onChange={this.props.setTabIndex}
            items={['Competition', 'Social', 'Education']}
            underline
          />
        </View>
        <FlatList
          keyExtractor={item =>
            item.id
              ? `${this.props.tabIndex}-${item.id}`
              : `${item[0] && item[0].id}`
          }
          style={{
            backgroundColor: colors.whiteTwo,
            paddingHorizontal: 15,
          }}
          data={groupedData}
          renderItem={this._getRenderItemFunction()}
        />
      </View>
    );
  }
}
