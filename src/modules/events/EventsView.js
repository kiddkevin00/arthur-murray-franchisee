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

const eventImages = [
  require('../../../assets/images/event-sample.png'),
  require('../../../assets/images/event-sample-2.png'),
  require('../../../assets/images/event-sample-3.jpg'),
  require('../../../assets/images/event-sample-4.jpg'),
  require('../../../assets/images/event-sample-5.jpeg'),
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
    isLoadingData: PropTypes.bool.isRequired,
    events: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,

    dispatchFetchEvents: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static currentImageToRenderIndex = 0;

  componentWillMount() {
    this.props.dispatchFetchEvents();
  }

  goToEventSignUp = eventInfo => {
    this.props.navigation.navigate({
      routeName: 'EventSignUp',
      params: { ...eventInfo },
    });
  };

  renderRow = rowData => {
    const cellViews = rowData.item.map(item => (
      <TouchableOpacity key={item._id} onPress={() => this.goToEventSignUp(item)}>
        <View style={styles.itemOneContainer}>
          <View style={styles.itemOneImageContainer}>
            <Image style={styles.itemOneImage} source={eventImages[(EventsScreen.currentImageToRenderIndex++) % eventImages.length]} />
          </View>
          <View style={styles.itemOneContent}>
            <Text style={styles.itemOneTitle}>
              {item.name}
            </Text>
            <Text
              style={styles.itemOneSubTitle}
              styleName="collapsible"
              numberOfLines={2}
            >
              {item.description}
            </Text>
            <Text style={styles.itemOnePrice}>
              {item.dateInterval}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.itemOneRow}>
        {cellViews}
      </View>
    );
  };

  render() {
    if (this.props.isLoadingData) {
      return null;
    }

    const groupedData = GridRow.groupByRows(this.props.events, 2);

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item[0]._id}
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
