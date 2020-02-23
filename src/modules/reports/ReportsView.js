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
  static propTypes = {
    reports: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,

    dispatchFetchStudioReports: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillMount() {
    this.props.dispatchResetState();

    this.props.dispatchFetchStudioReports();
  }

  _openArticle = () => {
    this.props.navigation.navigate({
      routeName: 'Charts',
    });
  };

  convertToPercentageDisplay(floatingNumber) {
    return `${(floatingNumber * 100).toFixed(2)}%`;
  }

  renderRow = ({ item }) => (
    <TouchableOpacity
      //key={item.id}
      style={styles.itemThreeContainer}
      onPress={() => this._openArticle(item)}
    >
      <View style={styles.itemThreeSubContainer}>
        <Image source={{ uri: null }} style={styles.itemThreeImage} />
        <View style={styles.itemThreeContent}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.itemThreeBrand}>Week {item.submitted_weeks}</Text>
            <View
              style={[
                styles.badge,
                { backgroundColor: item.lessonsSold > 800 ? '#3cd39f' : '#ffae42' },
              ]}
            >
              <Text
                style={{ fontSize: 10, color: colors.white }}
                styleName="bright"
              >
                {item.lessonsSold > 800 ? 'GOOD' : 'ATTENTION'}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.itemThreeTitle}>Lessons Sold: {item.lessonsSold}</Text>

            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              Miscellaneous Sales: {this.convertToPercentageDisplay(item.miscellaneousVsGross)}
            </Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              Contacted Conversion: {this.convertToPercentageDisplay(item.bookedVsContact)}
            </Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              Showed Conversion: {this.convertToPercentageDisplay(item.showedVsOriginalSold)}
            </Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              Extension Sold: {item.extension_sold}
            </Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              Extension Sold from Original: {this.convertToPercentageDisplay(item.originalSoldVsExtensionSold)}
            </Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              Health of the studio: {this.convertToPercentageDisplay(item.lessonsTaughtVsLessonsSold)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => `${item._id}`}
          style={{
            backgroundColor: colors.whiteTwo,
            paddingHorizontal: 15,
          }}
          data={this.props.reports}
          renderItem={this.renderRow}
        />
      </View>
    );
  }
}
