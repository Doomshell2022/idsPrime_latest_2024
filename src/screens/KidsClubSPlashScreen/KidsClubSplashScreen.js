import React, {PureComponent} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';

// Images
import KidsCLub from '../../assets/SchoolLogo/KidsClub.png';

const {width, height} = Dimensions.get('window');

export default class KidsClubSplashScreen extends PureComponent {
  state = {
    opacity: new Animated.Value(0),
  };

  handleAnimation = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const animatedImageStyle = [
      {
        opacity: this.state.opacity,
        transform: [
          {
            scale: this.state.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.85, 1],
            }),
          },
        ],
      },
      styles.logo,
    ];

    return (
      <View style={styles.container}>
        <Animated.Image
          source={KidsCLub}
          resizeMode="contain"
          onLoad={this.handleAnimation}
          style={animatedImageStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5, // 50% of the screen width
    height: height * 0.25, // 25% of the screen height
  },
});
