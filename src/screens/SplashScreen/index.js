import React, {PureComponent} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import {getActiveSchool} from 'api/UserPreference';

// Images
import splash_screen_logo from 'assets/images/splash_screen_logo.png';

export default class SplashScreen extends PureComponent {
  state = {
    opacity: new Animated.Value(0),
    logo: null, // State to store the logo URL
  };

  componentDidMount() {
    this.renderSplash();
  }

  handleAnimation = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  renderSplash = async () => {
    try {
      const school = await getActiveSchool();
      if (school && school.logo) {
        const logo = school.logo;
        console.log('Logo URL:', logo);
        this.setState({logo}, this.handleAnimation); // Update the state and start the animation
      } else {
        console.log('Logo not found');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {opacity, logo} = this.state;
    const {width, height} = Dimensions.get('window');

    const animatedImageStyle = [
      {
        opacity: opacity,
        transform: [
          {
            scale: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.85, 1],
            }),
          },
        ],
      },
      {width: width * 0.8, height: height * 0.8}, // Adjust the size according to the screen dimensions
    ];

    return (
      <View style={styles.container}>
        <Animated.Image
          source={logo ? {uri: logo} : splash_screen_logo}
          resizeMode="contain"
          onLoad={this.handleAnimation}
          style={[styles.logo, animatedImageStyle]}
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
    // You may adjust other styles here if needed
  },
});
