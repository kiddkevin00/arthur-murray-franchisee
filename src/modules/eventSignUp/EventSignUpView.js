import { colors } from '../../styles';
import { Dropdown, Button } from '../../components';
import { Text, Title, Caption } from '../../components/StyledText';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  carouselContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  bodyContainer: {
    paddingHorizontal: 15,
  },
  bodyHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  sizeDropdownContainer: {
    flex: 2,
    paddingVertical: 10,
    paddingRight: 5,
  },
  quantityDropdownContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
  },
  buttonsSection: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  actionButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  p: {
    marginVertical: 5,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.gray,
  },
  description: {
    paddingTop: 10,
    marginVertical: 10,
  },
  recommendationsContainer: {
    backgroundColor: colors.white,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  recommendationItem: {
    marginVertical: 10,
    paddingBottom: 10,
    marginRight: 15,
    borderWidth: 0.7,
    borderColor: colors.lightGray,
  },
  recommendationBody: {
    backgroundColor: 'white',
    padding: 8,
  },
  recommendationName: {
    marginVertical: 5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.green,
    position: 'absolute',
    left: 15,
    top: 0,
  },
  recommendationItemTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingRight: 5,
  },
  recommendationItemBadge: {
    backgroundColor: colors.secondary,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  recommendationItemRating: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 3,
  },
});

export default function EventSignUpScreen(props) {
  const _renderRecommendationCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendationItem}
      onPress={() => props.navigation.replace({
        routeName: 'EventSignUp',
        params: { ...item },
      })}
    >
      <View style={styles.recommendationItemTopContainer}>
        {item.badge && (
          <View style={styles.recommendationItemBadge}>
            <Caption white size={12}>
              {item.badge}
            </Caption>
          </View>
        )}

        <View style={styles.recommendationItemRating}>
          <Caption bold color={colors.yellow}>
            {(item.rating || 5.0).toFixed(1)}
          </Caption>
        </View>
      </View>
      <Image
        style={{ width: 150, height: 100 }}
        source={require('../../../assets/images/icon.png')}
        resizeMode="contain"
      />
      <View style={styles.recommendationBody}>
        <Text color={colors.gray} style={styles.recommendationName}>
          {item.name}
        </Text>
        <Text color={colors.primaryLight}>{item.location || 'United State'}</Text>
        <View style={{ marginTop: 5, flexDirection: 'row' }}>
          {item.oldPrice && (
            <Text lineThrough color={colors.gray} style={{ marginRight: 10 }}>
              {item.oldPrice}
            </Text>
          )}
          <Text color={item.oldPrice ? colors.secondary : colors.gray}>
            {item.dateInterval}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const itemParams = props.navigation.state.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Text style={{ color: colors.primaryLight }}>
            {itemParams.location || 'United State'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              marginTop: 8,
            }}
          >
            <Title bold color={colors.gray}>
              {itemParams.name}
            </Title>
            <Title bold color={colors.yellow}>
              {(itemParams.rating || 5.0).toFixed(1)}
            </Title>
          </View>
        </View>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          autoplay
          sliderWidth={Dimensions.get('window').width - 30}
          itemWidth={Dimensions.get('window').width}
          renderItem={({ item }) => (
            <Image
              resizeMode="contain"
              style={{ height: 250, width: Dimensions.get('window').width }}
              source={item}
            />
          )}
          data={[
            require('../../../assets/images/event-sample.png'),
            require('../../../assets/images/event-sample-2.png'),
            require('../../../assets/images/event-sample-3.jpg'),
            require('../../../assets/images/event-sample-4.jpg'),
            require('../../../assets/images/event-sample-5.jpeg'),
          ]}
        />
        {itemParams.badge && (
          <View style={styles.badge}>
            <Caption white bold>
              {itemParams.badge}
            </Caption>
          </View>
        )}
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyHeading}>
          <Title color={colors.gray} size={23}>
            {itemParams.dateInterval}
          </Title>
          <Caption underline size={15} color={colors.lightGray}>
            Official Website
          </Caption>
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text color={colors.primaryLight}>Admission Ticket</Text>
          <View style={styles.row}>
            <View style={styles.sizeDropdownContainer}>
              <Dropdown
                borderColor={colors.grey}
                color={colors.gray}
                placeholder="Select Admission Type"
                items={[
                  'Early Bird Discount',
                  'General Admission',
                  'Premium Admission',
                  'VIP Admission',
                  'Official Platinum',
                ]}
                onSelect={index =>
                  props.setSelectedAdmissionTypeIndex(parseInt(index, 10))
                }
                selectedIndex={props.selectedAdmissionTypeIndex}
              />
            </View>
            <View style={styles.quantityDropdownContainer}>
              <Dropdown
                borderColor={colors.grey}
                color={colors.gray}
                placeholder="Quantity"
                items={[
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                ]}
                onSelect={index =>
                  props.setSelectedQuantityIndex(parseInt(index, 10))
                }
                selectedIndex={props.selectedQuantityIndex}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonsSection}>
          <View style={{ flex: 3 }}>
            <Button secondary caption="Sign Up" rounded />
          </View>
          <View style={styles.actionButtonContainer}>
            <Button action bgColor="#E6E6E6">
              <Text>
                <Icon name="heart" size={20} color="white" />
              </Text>
            </Button>
          </View>
        </View>
        <View style={styles.description}>
          <Title bold color={colors.lightGray} size={17}>
            Event Details
          </Title>
          <Text style={styles.p}>{itemParams.description}</Text>
          <Text style={styles.p}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.
          </Text>
        </View>
        <View style={{ alignItems: 'center', paddingVertical: 15 }}>
          <Button
            bordered
            bgColor={colors.grey}
            textColor={colors.gray}
            caption="Write a review"
            style={{
              width: 200,
            }}
          />
        </View>
      </View>
      <View style={styles.recommendationsContainer}>
        <Title color={colors.lightGray} style={{ marginVertical: 10 }}>
          YOU MIGHT ALSO BE INTERESTED
        </Title>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={props.events}
          keyExtractor={item => item._id}
          renderItem={_renderRecommendationCard}
        />
      </View>

      <View style={{ paddingBottom: 50, paddingHorizontal: 15 }}>
        <Title color={colors.lightGray} style={{ marginVertical: 10 }}>
          Share
        </Title>
        <View style={{ flexDirection: 'row' }}>
          <Text color={colors.gray}>Share with a tag</Text>
          <Text color={colors.blue} style={{ marginLeft: 5 }}>
            #arthurmurray
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Button action bgColor="#4867AD" onPress={() => {}}>
            <Icon name="facebook" size={25} color="white" />
          </Button>
          <Button
            action
            bgColor="#7A3EB1"
            onPress={() => {}}
            style={{ marginHorizontal: 15 }}
          >
            <Icon name="instagram" size={25} color="white" />
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
