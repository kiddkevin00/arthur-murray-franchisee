import { Button } from '../../components';
import { fonts, colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    padding: 20,
  },
  section: {
    flex: 3,
    position: 'relative',
  },
  title: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 25,
    letterSpacing: 0.04,
    marginBottom: 10,
  },
  lightText: {
    color: colors.white,
  },
  quickFacts: {
    height: 60,
    flexDirection: 'row',
  },
  quickFact: {
    flex: 1,
  },
  infoSection: {
    flex: 1,
  },
  infoRow: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  hr: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    marginLeft: 20,
  },
  infoIcon: {
    marginRight: 20,
  },
  bottomRow: {
    height: 80,
    flexDirection: 'row',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  position: {
    color: colors.white,
    fontFamily: fonts.primaryLight,
    fontSize: 16,
    marginBottom: 3,
  },
  company: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  quickInfoText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
  },
  bottomImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ProfileScreen({ email, firstName, lastName}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require('../../../assets/images/me.png')}
        style={[styles.section, styles.header]}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.title}>{firstName} {lastName}</Text>
          <View>
            <Text style={styles.position}>Professional Dancer</Text>
            <Text style={styles.company}>USA</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            secondary
            rounded
            small
            caption="Contact"
            onPress={() => {}}
          />

          {/*
          <Button
            rounded
            bordered
            small
            style={{ marginLeft: 20 }}
            caption="Follow"
            onPress={() => {}}
          />
          */}
        </View>
      </ImageBackground>
      <View style={styles.section}>
        <View
          //start={{ x: 0, y: 1 }}
          //end={{ x: 1, y: 0 }}
          colors={[colors.profileGradientStart, colors.profileGradientEnd]}
          style={[styles.quickFacts, { backgroundColor: colors.profileGradientStart }]}
        >
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoText}>99</Text>
            <Text style={styles.quickInfoText}>Competitions</Text>
          </View>

          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoText}>78</Text>
            <Text style={styles.quickInfoText}>Awards</Text>
          </View>

          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoText}>215</Text>
            <Text style={styles.quickInfoText}>Students</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.infoRow}>
            <Icon
              style={styles.infoIcon}
              name="map-marker"
              size={20}
              color="#c3c3c3"
            />
            <Text>New York, USA</Text>
          </View>
          <View style={styles.hr} />

          <View style={styles.infoRow}>
            <Icon
              style={styles.infoIcon}
              name="instagram"
              size={20}
              color="#c3c3c3"
            />
            <Text>@FredericH</Text>
          </View>
          <View style={styles.hr} />

          <View style={styles.infoRow}>
            <Icon
              style={styles.infoIcon}
              name="mail-forward"
              size={20}
              color="#c3c3c3"
            />
            <Text>{email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
