import React from 'react';
import {Text, Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Tile = props => {
  const {showNotification, notificationCount} = props;

  const openScreen = () => {
    props.nav.navigate(props.title);
  };

  const tileContainer = {
    backgroundColor: props.color,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  };

  return (
    <TouchableHighlight onPress={openScreen} style={styles.tileBox}>
      <View style={tileContainer}>
        {notificationCount !== 0 && showNotification ? (
          <Image
            style={styles.iconImage2}
            source={props.image}
            resizeMode="cover"
          />
        ) : (
          <Image
            style={styles.iconImage}
            source={props.image}
            resizeMode="cover"
          />
        )}

        <Text style={styles.title}>{props.title}</Text>
        {showNotification && (
          <Text style={styles.notificationCount}>({notificationCount})</Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

export default Tile;

const styles = StyleSheet.create({
  iconImage: {
    height: hp(4),
    aspectRatio: 1 / 1,
  },
  iconImage2: {
    height: hp(6),
    aspectRatio: 1 / 1,
  },
  tileBox: {
    flex: 1,
    padding: wp(0.5),
  },
  title: {
    color: '#fff',
    fontSize: wp(3),
    textAlign: 'center',
    marginTop: hp(1),
  },
  notificationCount: {
    color: '#fff',
    fontSize: wp(3),
    textAlign: 'center',
  },
});
