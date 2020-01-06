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
    brand: 'Week 28',
    title: 'Miscellaneous Sales',
    subtitle: 'Miscellaneous vs Gross',
    price: '80%',
    badge: 'GOOD',
    badgeColor: '#3cd39f',
    image: null,
  },
  {
    id: 2,
    brand: 'Week 28',
    title: 'Contacted Conversion',
    subtitle: 'Booked vs Contacted',
    price: '40%',
    badge: 'NEED IMPROVEMENT',
    badgeColor: '#ee1f78',
    image: null,
  },
  {
    id: 3,
    brand: 'Week 28',
    title: 'Showed Conversion',
    subtitle: 'Showed vs Original Sold',
    price: '50%',
    priceFrom: true,
    badge: 'NEED ATTENTION',
    badgeColor: '#ffae42',
    image: null,
  },
  {
    id: 4,
    brand: 'Week 28',
    title: 'Extension Sold',
    subtitle: 'Number of Extensions Sold',
    price: '216',
    badge: 'GOOD',
    badgeColor: '#3cd39f',
    image: null,
  },
  {
    id: 5,
    brand: 'Week 28',
    title: 'Extension Sold from Original',
    subtitle: 'Year-to-date Original Sold vs Extension Sold.',
    price: '0%',
    badge: 'NEED IMPROVEMENT',
    badgeColor: '#ee1f78',
    image: null,
  },
  {
    id: 6,
    brand: 'Week 28',
    title: 'Lessons Sold',
    subtitle: 'Number of Lessons Sold',
    price: '99',
    badge: 'GOOD',
    badgeColor: '#3cd39f',
    image: null,
  },
  {
    id: 7,
    brand: 'Week 28',
    title: 'Health of the studio',
    subtitle: 'Year-to-date PVT vs Lessons Sold',
    price: '80%',
    badge: 'GOOD',
    badgeColor: '#3cd39f',
    image: null,
  },
  {
    id: 8,
    brand: 'Week 27',
    title: 'Miscellaneous Sales',
    subtitle: 'Miscellaneous vs Gross',
    price: '60%',
    badge: 'AVERAGE',
    badgeColor: '#3cd39f',
    image: null,
  },
  {
    id: 9,
    brand: 'Week 27',
    title: 'Contacted Conversion',
    subtitle: 'Booked vs Contacted',
    price: '30%',
    badge: 'NEED IMPROVEMENT',
    badgeColor: '#ee1f78',
    image: null,
  },
  {
    id: 10,
    brand: 'Week 27',
    title: 'Showed Conversion',
    subtitle: 'Showed vs Original Sold',
    price: '45%',
    priceFrom: true,
    badge: 'NEED ATTENTION',
    badgeColor: '#ffae42',
    image: null,
  },
  {
    id: 11,
    brand: 'Week 27',
    title: 'Extension Sold',
    subtitle: 'Number of Extensions Sold',
    price: '214',
    badge: 'GOOD',
    badgeColor: '#3cd39f',
    image: null,
  },
  {
    id: 12,
    brand: 'Week 27',
    title: 'Extension Sold from Original',
    subtitle: 'Year-to-date Original Sold vs Extension Sold.',
    price: '1%',
    badge: 'NEED IMPROVEMENT',
    badgeColor: '#ee1f78',
    image: null,
  },
  {
    id: 13,
    brand: 'Week 28',
    title: 'Lessons Sold',
    subtitle: 'Number of Lessons Sold',
    price: '98',
    badge: 'GOOD',
    badgeColor: '#3cd39f',
    image: null,
  },
  {
    id: 14,
    brand: 'Week 28',
    title: 'Health of the studio',
    subtitle: 'Year-to-date PVT vs Lessons Sold',
    price: '85%',
    badge: 'GOOD',
    badgeColor: '#3cd39f',
    image: null,
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
    width: 0,
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

export default class ReportsScreen extends React.Component {
  _openArticle = () => {
    this.props.navigation.navigate({
      routeName: 'Charts',
    });
  };

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
                  { backgroundColor: item.badgeColor },
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
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => `${item.id}`}
          style={{
            backgroundColor: colors.whiteTwo,
            paddingHorizontal: 15,
          }}
          data={dummyData}
          renderItem={this.renderRowThree}
        />
      </View>
    );
  }
}
